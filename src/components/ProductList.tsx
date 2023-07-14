import useProducts from "../hooks/useProduct";
import useCart from "../hooks/useCart";
import Product from "./Product";
import { UseProductsContextType } from "../context/ProductsProvider";
import { ReactElement } from "react";

const ProductList = () => {
    
    const { dispatch, REDUCER_ACTIONS, cart } = useCart()
    const { products } = useProducts()

    let pageContent : ReactElement | ReactElement[] = <p>...Loading</p>

    if (products?.length) {
        pageContent = products.map(product => {    // if the product has length show this content
            const inCart : boolean = cart.some(item => item.sku === product.sku) 

            return (
                <Product 
                key={product.sku}
                dispatch = {dispatch}
                REDUCER_ACTIONS = {REDUCER_ACTIONS}
                product = {product}
                inCart = {inCart}
                />

            )
        })

        const content = (
            <main className="main main--products">
                {pageContent}
            </main>
        )

        
        return content
    }
}
 
export default ProductList;