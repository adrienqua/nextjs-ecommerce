import Image from "next/image"
import Link from "next/link"
import React from "react"
import AddToCart from "./AddToCart"

export default function ProductListItem({ product }) {
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
                        <AddToCart id={product.id} />
                    </div>
                </div>
            </div>
        </>
    )
}
