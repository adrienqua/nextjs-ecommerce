import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import React from "react"

export default function CartOrder({
    children,
    subTotal,
    shipping,
    handleOrder,
}) {
    return (
        <div className="cart-order bg-white rounded-xl px-8 py-6 shadow-sm md:w-1/3 mb-5">
            <h2 className="h1 mb-5">Ma commande</h2>
            {children}
        </div>
    )
}
