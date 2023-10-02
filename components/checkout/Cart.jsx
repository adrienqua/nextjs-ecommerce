"use client"

import { getCart } from "@/app/services/cartAPI"
import { useCartContext } from "@/components/contexts/CartContext"
import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import CartOrder from "./CartOrder"

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
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="">
                                            <Link href={`products/${product.id}`} className="text-gray-800 font-bold">
                                                {product.product.name}
                                            </Link>
                                            <div className="text-gray-500 flex flex-col leading-none">
                                                {product.color?.name && (
                                                    <span>
                                                        <small className="font-medium">
                                                            Couleur :{" "}
                                                            <span className="font-semibold">{product.color.name}</span>
                                                        </small>
                                                    </span>
                                                )}
                                                {product.size?.name && (
                                                    <span>
                                                        <small className="font-medium">
                                                            Taille :{" "}
                                                            <span className="font-semibold">{product.size.name}</span>
                                                        </small>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-gray-600 font-medium">{formatPrice(product.price)}</td>
                                    <td className="text-gray-700 font-medium">
                                        <div className="flex flex-col-reverse md:flex-row items-center md:space-x-1">
                                            <button onClick={() => onDecrement(product.id)} className="btn btn-xs">
                                                -
                                            </button>
                                            <span>{product.quantity}</span>
                                            <button onClick={() => onIncrement(product.id)} className="btn btn-xs">
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-gray-800 font-semibold">
                                            {formatPrice(product.price * product.quantity)}
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
