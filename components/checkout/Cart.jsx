"use client"

import { getCart } from "@/app/services/cartAPI"
import { useCartContext } from "@/components/contexts/CartContext"
import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import CartOrder from "./CartOrder"
import Image from "next/image"
import CartItem from "./CartItem"

export default function CartTable({ products, cartProducts, onIncrement, onDecrement }) {
    return (
        <div className="cart-table bg-white rounded-xl px-8 py-6 shadow-sm mb-5">
            <h1 className="h1 mb-5">
                Mon panier <span className="text-sm text-gray-500">({cartProducts?.length} articles)</span>
            </h1>
            {products?.length === 0 && <p>Votre panier est vide.</p>}
            {products?.length > 0 && (
                <div className="overflow-x-auto ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th className="hidden md:table-cell">Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <CartItem
                                    product={product}
                                    key={index}
                                    onIncrement={onIncrement}
                                    onDecrement={onDecrement}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
