"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useContext, useEffect } from "react"
import { CartContext, useCartContext } from "../contexts/CartContext"

export default function ProductListItem({ product }) {
    const { cartProducts, setCartProducts, handleAddToCart } = useCartContext()

    return (
        <>
            <div
                className="card card-compact  bg-base-100 shadow-xl"
                key={product.id}
            >
                <Link href={`/products/${product.id}`}>
                    <figure>
                        <Image
                            src="/img/500.jpg"
                            width={500}
                            height={350}
                            alt={product.description}
                        />
                    </figure>
                </Link>
                <div className="card-body">
                    <Link href={`/products/${product.id}`}>
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>
                    </Link>
                    <div className="card-actions flex justify-between items-center">
                        <span>{parseFloat(product.price).toFixed(2)} €</span>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleAddToCart(product.id)}
                        >
                            Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
