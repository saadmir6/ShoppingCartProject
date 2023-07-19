import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";


type propsType ={
    item : CartItemType,
    dispatch : React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS : ReducerActionType,

    
}
const CartLIneItem = ({item, dispatch, REDUCER_ACTIONS}: propsType) => {

        const img : string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href // the href refers to the string type

        const lineTotal : number = (item.qty * item.price)

        const highestQty : number = 20 > item.qty ? 20 : item.qty  // if tis higher than 20 than keep adding

        const optionValues : number[] = [...Array(highestQty).keys()].map(i => i + 1) // options from 1 to 20

        const options : ReactElement[] = optionValues.map( val => {
            return <option key={`opt${val}`} value={val} >
                    {val}
                </option>
        })

        const onChangeQty = (e:ChangeEvent<HTMLSelectElement>) => {
            dispatch ({
                type : REDUCER_ACTIONS.QUANTITY,
                payload : { ...item, qty:Number(e.target.value)},
            })
        }

        const onRemoveFromCart = () => dispatch ({
            type : REDUCER_ACTIONS.REMOVE,
            payload : item,
        })

        const content = (
            <li className="cart__item">
                <img src={img} alt={item.name} className="cart__img" />
                <div aria-label="Item Name">
                    {item.name}
                </div>
                <div aria-label="Price Per Item">
                    {new Intl.NumberFormat('en-US', {style : 'currency', currency : 'USD'}).format (item.price)}
                </div>

                <label htmlFor="itemQty" className="offscreen">
                    Item Quantity
                </label>
                <select 
                    name="itemQty" 
                    id="itemQty" 
                    className="cart__select" 
                    value={item.qty} 
                    aria-label="itemQty" 
                    onChange={onChangeQty}
                >  
                    {options}

                </select>

                <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                    {new Intl.NumberFormat('en-US', {style : 'currency', currency : 'USD'}).format (lineTotal)}
                </div>

                <button  
                    className="cart_button" 
                    aria-label="Remove Item From Cart" 
                    title="Remove Item From Cart" 
                    onClick={onRemoveFromCart}
                >
                    DELETE
                </button>
            </li>
        )
            
    return content
}

function ItemsEqual({ item: prevItem } : propsType, { item : nextItem} : propsType) {
    return Object.keys(prevItem).every( key => {
        return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
    })
}

const MemoizedCartLineItem = memo<typeof CartLIneItem>(CartLIneItem, ItemsEqual)

export default MemoizedCartLineItem;