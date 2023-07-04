"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext({})

export const CartContextProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    function handleAddToCart(product) {
        setCartProducts((prev) => [...prev, product])

        console.log(product)
    }

    useEffect(() => {
        if (cartProducts.length === 0) {
            setCartProducts(JSON.parse(localStorage.getItem("cart")))
        } else {
            localStorage.setItem("cart", JSON.stringify(cartProducts))
        }
    }, [cartProducts])

    return (
        <CartContext.Provider
            value={{ cartProducts, setCartProducts, handleAddToCart }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)
