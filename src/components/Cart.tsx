import { useState } from "react";
import useCart from "../hooks/useCart";
import CartLIneItem from "./CartLineItem";

const Cart = () => {

    const [confirm, setConfirm] = useState<boolean>(false)

    const { dispatch, REDUCER_ACTIONS, total_items, totalPrice, cart} = useCart()

    const onSubmitOrder = () => {
        dispatch( {type : REDUCER_ACTIONS.SUBMIT})
        setConfirm(true)
    }

    const pageContent = confirm 
        ? <h2>Thank you for your Order!</h2>
        : <>
            <h2 className="offscreen">Cart</h2>
            <ul className="cart">
                {
                    cart.map( item => {
                        return (
                            <CartLIneItem 
                            key = {item.sku}
                            item = {item}
                            dispatch = {dispatch}
                            REDUCER_ACTIONS = {REDUCER_ACTIONS}
                            />   
                        )
                        
                    })
                }
            </ul>
            <div className="cart__totals">
                <p>Total Items: {total_items}</p>
                <p>Total Price: {totalPrice}</p>
                <button className="cart__submit" 
                onClick={onSubmitOrder}
                disabled = {!total_items}> {/* the button will be disabled if there are no items in the cart */}
                Place Order
                </button>
            </div>
        </>

        const content = (
            <main className="main main--cart">
                {pageContent}
            </main>
        )
    return content
}
 
export default Cart;