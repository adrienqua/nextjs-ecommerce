import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function ProductListItem({ product }) {
    return (
        <>
            <Link
                className="card card-compact  bg-base-100 shadow-xl"
                key={product.id}
                href={`/products/${product.id}`}
            >
                <figure>
                    <Image
                        src="/img/500.jpg"
                        width={500}
                        height={350}
                        alt={product.description}
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="card-actions flex justify-between items-center">
                        <span>{parseFloat(product.price).toFixed(2)} €</span>
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </Link>
        </>
    )
}
