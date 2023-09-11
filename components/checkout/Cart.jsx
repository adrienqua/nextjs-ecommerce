"use client"

import { getCart } from "@/app/services/cartAPI"
import { useCartContext } from "@/components/contexts/CartContext"
import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import CartOrder from "./Order"

export default function CartTable({
    products,
    cartProducts,
    onIncrement,
    onDecrement,
}) {
    return (
        <div className="cart-table bg-white rounded-xl px-8 py-6 shadow-sm md:w-2/3 mb-5">
            <h1 className="h1 mb-5">
                Mon panier{" "}
                <span className="text-sm text-gray-500">
                    ({cartProducts?.length} articles)
                </span>
            </h1>
            {products?.length === 0 && <p>Votre panier est vide.</p>}
            {products?.length > 0 && (
                <div className="overflow-x-auto ">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="font-medium">
                                        <Link href={`products/${product.id}`}>
                                            {product.product.name}
                                        </Link>
                                        {product.size?.name && (
                                            <div>
                                                <small>
                                                    Taille :{" "}
                                                    <span className="font-medium">
                                                        {product.size.name}
                                                    </span>
                                                </small>
                                            </div>
                                        )}
                                        {product.color?.name && (
                                            <div>
                                                <small>
                                                    Couleur :{" "}
                                                    <span className="font-medium">
                                                        {product.color.name}
                                                    </span>
                                                </small>
                                            </div>
                                        )}
                                    </td>
                                    <td>{formatPrice(product.price)}</td>
                                    <td className="space-x-1">
                                        <button
                                            onClick={() =>
                                                onDecrement(product.id)
                                            }
                                            className="btn btn-xs"
                                        >
                                            -
                                        </button>
                                        <span>{product.quantity}</span>
                                        <button
                                            onClick={() =>
                                                onIncrement(product.id)
                                            }
                                            className="btn btn-xs"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>
                                        <span className="font-medium">
                                            {formatPrice(
                                                product.price * product.quantity
                                            )}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
