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
    REDUCE : "REDUCE",
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
        case REDUCER_ACTION_TYPE.REDUCE: {

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