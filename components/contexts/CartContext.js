"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])
    const [counter, setCounter] = useState(0)

    function handleAddToCart(product) {
        setCartProducts((prev) => [...prev, product])
        setCounter((prev) => prev + 1)
    }

    function handleSubstractToCart(product) {
        let products = [...cartProducts]
        const index = products.indexOf(product)
        if (index > -1) {
            products.splice(index, 1)
        }
        setCartProducts(products)
        setCounter((prev) => prev + 1)
    }

    useEffect(() => {
        if (localStorage.getItem("cart") === null) {
            localStorage.setItem("cart", JSON.stringify([]))
        } else {
            if (cartProducts?.length === 0) {
                setCartProducts(JSON.parse(localStorage.getItem("cart")))
            } else {
                localStorage.setItem("cart", JSON.stringify(cartProducts))
            }
        }
    }, [counter])

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                setCartProducts,
                handleAddToCart,
                handleSubstractToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)
