import { createContext, ReactElement, useState, useEffect } from "react"

export type ProductType = {
    sku : string,
    name : string,
    price : number,
}

// const initState : ProductType[] = [] // start out as an empty array for dynamically fetching the data

const initState : ProductType[] = [        // hardcoded code
    {
        "sku" : "item0001",
        "name" : "Widget",
        "price" : 9.99
    },
    {
        "sku" : "item0002",
        "name" : "Premium Widget",
        "price" : 19.99
    },
    {
        "sku" : "item0003",
        "name" : "Delux Widget",
        "price" : 29.99
    }
]

export type UseProductsContextType = { products: ProductType[] }

const initContextState : UseProductsContextType = { products: [] }

const ProductsContext = createContext<UseProductsContextType>(initContextState)

type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [ products, setProducts] = useState<ProductType[]>(initState)

    // useEffect(() => {
    //     const fetchProducts = async(): Promise<ProductType[]> => {
    //         const data = await fetch('http://localhost:3500/products').then( res => {
    //             return res.json()
    //         }).catch(err =>{
    //             if ( err instanceof Error ) console.log(err.message)
    //         })
    //         return data
    //     }

    //     fetchProducts().then( products => setProducts(products) )

    // }, []) // the empty dependancy array is given because the products need to load once

    return(
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsContext