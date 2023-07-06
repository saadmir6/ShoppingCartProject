import { createContext, ReactElement, useState } from "react"

export type ProductType = {
    sku : string,
    name : string,
    price : number,
}

const initState : ProductType[] = [
    {
        "sku" : "item001",
        "name" : "Widget",
        "price" : 9.99
    },
    {
        "sku" : "item002",
        "name" : "Premium Widget",
        "price" : 19.99
    },
    {
        "sku" : "item003",
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

    return(
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}