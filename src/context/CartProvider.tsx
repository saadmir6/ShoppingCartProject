import { ReactElement, createContext, useMemo, useReducer } from "react"

export type CartItemType = {
    sku : string,
    name : string,
    price : number,
    qty: number,
}

type CartStateType = { cart: CartItemType[] }  // A type

const initCartState : CartStateType = { cart: [] }   // This time its a value not a type

const REDUCER_ACTION_TYPE = {
    ADD : "ADD", 
    REMOVE : "REMOVE",
    QUANTITY : "QUANTITY",
    SUBMIT : "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type : string,
    payload? : CartItemType
}

const reducer = (state:CartStateType, action:ReducerAction): 
CartStateType => {  // it returns
    switch(action.type) {
        case REDUCER_ACTION_TYPE.ADD: {

            if (!action.payload) {
                throw new Error("action.payload missing in ADD action")
            }

            const { sku, price, name} = action.payload
            const filteredCart : CartItemType[] = state.cart.filter(item => item.sku !== sku) // the items that are not updating are filtered

            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku == sku)
            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return { ...state, cart: [ ... filteredCart, { sku, price, name, qty }] }
        }
        case REDUCER_ACTION_TYPE.REMOVE: {

            if (!action.payload) {
                throw new Error("action.payload missing in REMOVE action")
            }

            const { sku } = action.payload
            const filteredCart : CartItemType[] = state.cart.filter(item => item.sku !== sku) 

            return { ...state, cart: [ ... filteredCart] }

        }
        case REDUCER_ACTION_TYPE.QUANTITY: {

            if (!action.payload) {
                throw new Error("action.payload missing in QUANTITY action")
            }

            const { sku, qty } = action.payload

            const itemExists : CartItemType | undefined = state.cart.find( item => item.sku == sku)

            if (!itemExists){
                throw new Error("Items must exist in order to update quantity")
            }

            const updateItem : CartItemType = { ...itemExists, qty}
            
            const filteredCartItem : CartItemType[] = state.cart.filter(item => item.sku !== sku)

            return {...state, cart: [...filteredCartItem, updateItem]}

        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            
            return { ...state, cart: []}

        }

        default :
                throw new Error("Unidentified reducer action")
    }

} 

const useCartContext = ( initCartState: CartStateType) => {
    const [ state, dispatch ] = useReducer(reducer, initCartState)
    
    const REDUCER_ACTIONS = useMemo(()=>{  // to reduce rerendering of REDUCER_ACTIONS we use the useMemo hook
        return REDUCER_ACTION_TYPE
    }, [])

    const total_items : number = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
    }, 0)   // initial value

    const totalPrice = Intl.NumberFormat('en-US', {style:"currency", currency:'USD'}).format(
        state.cart.reduce((previousValue, cartItem) => {
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0)
    )

    const cart = state.cart.sort((a, b) => {
        const itemA = Number(a.sku.slice(-4))
        const itemB = Number(b.sku.slice(-4))
        return itemA - itemB
    })

    return { dispatch, REDUCER_ACTIONS, totalPrice, total_items, cart}

}

export type UseCartContextType = ReturnType<typeof useCartContext> 

const initCartContextState : UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS : REDUCER_ACTION_TYPE,
    total_items : 0,
    totalPrice : "",
    cart : [],
}

export const CartContext = createContext<UseCartContextType>(initCartContextState) // the type and the initial values

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const CartProvider = ({children} : ChildrenType) : 
ReactElement => {
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext