import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import React from "react"

export default function CartOrder({ subTotal, shipping }) {
    return (
        <div className="cart-order bg-white rounded-xl px-8 py-6 shadow-sm md:w-1/3 mb-5">
            <h2 className="h1 mb-5">Ma commande</h2>
            <div className="cart-details flex flex-col mb-5">
                <div className="cart-subtotal flex justify-between">
                    <span>Sous total</span>
                    <span className="font-medium">{formatPrice(subTotal)}</span>
                </div>
                <div className="cart-shipping flex justify-between">
                    <span>Livraison</span>
                    <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <hr />
                <div className="cart-total flex justify-between">
                    <span>Total</span>
                    <span className="font-bold">
                        {formatPrice(subTotal + shipping)}
                    </span>
                </div>
            </div>

            {/* <button
                    className="btn btn-primary btn-md"
                    onClick={() => handleOrder()}
                >
                    Passer la commande
                </button> */}
            <Link href="/checkout" className="btn btn-primary btn-md">
                Passer la commande
            </Link>
        </div>
    )
}
