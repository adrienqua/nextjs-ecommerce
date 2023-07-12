"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    function handleAddToCart(product) {
        setCartProducts((prev) => [...prev, product])
    }

    function handleSubstractToCart(product) {
        let products = [...cartProducts]
        const index = products.indexOf(product)
        if (index > -1) {
            products.splice(index, 1)
        }
        setCartProducts(products)
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
    }, [cartProducts])

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
