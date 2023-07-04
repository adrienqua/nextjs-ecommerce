"use client"

import { getCart } from "@/app/services/cartAPI"
import { useCartContext } from "@/components/contexts/CartContext"
import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function CartTable() {
    const { cartProducts } = useCartContext()
    const [products, setProducts] = useState([])

    const fetchCart = async () => {
        setProducts(await getCart(cartProducts))
    }
    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className="flex space-x-5">
            <div className="cart-table bg-white rounded-xl px-8 py-6 shadow-sm md:w-2/3">
                <h1 className="h1">
                    Mon panier{" "}
                    <span className="text-sm text-gray-500">
                        ({cartProducts?.length} articles)
                    </span>
                </h1>
                {products.length === 0 && <p>Votre panier est vide.</p>}
                {products.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th>Quantité</th>
                                    <th>Prix</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link
                                                href={`products/${product.id}`}
                                            >
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td>
                                            {
                                                cartProducts.filter(
                                                    (id) => id === product.id
                                                ).length
                                            }
                                        </td>
                                        <td>
                                            {formatPrice(
                                                product.price *
                                                    cartProducts.filter(
                                                        (id) =>
                                                            id === product.id
                                                    ).length
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className="cart-table bg-white rounded-xl px-8 py-6 shadow-sm md:w-1/3">
                <h2 className="h1">Ma commande</h2>

                <button className="btn btn-primary btn-md">
                    Passer la commande
                </button>
            </div>
        </div>
    )
}
