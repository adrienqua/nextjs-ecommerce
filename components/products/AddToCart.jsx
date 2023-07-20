"use client"
import React from "react"
import { useCartContext } from "../contexts/CartContext"

export default function AddToCart({ id }) {
    const { handleAddToCart } = useCartContext()

    return (
        <button className="btn btn-primary" onClick={() => handleAddToCart(id)}>
            Ajouter au panier
        </button>
    )
}