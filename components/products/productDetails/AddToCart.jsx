"use client"
import { useCartContext } from "@/components/contexts/CartContext"
import React from "react"

export default function AddToCart({ id }) {
    const { handleAddToCart } = useCartContext()

    return (
        <button className="btn btn-primary mt-5" onClick={() => handleAddToCart(id)}>
            Ajouter au panier
        </button>
    )
}
