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
                    <figure className="rounded-t-2xl">
                        <Image
                            src="/img/500.jpg"
                            width={500}
                            height={350}
                            alt={product.description}
                        />
                    </figure>
                </Link>
                <div className="card-body">
                    <div className="card-actions flex flex-row">
                        <Link
                            className="flex-1"
                            href={`/products/${product.id}`}
                        >
                            <h2 className="card-title text-lg">
                                {product.name}
                            </h2>
                        </Link>
                        <div className="basis-1/4 pt-[5px]">
                            <span>
                                {parseFloat(product.price).toFixed(2)} €
                            </span>
                        </div>
                        {/* <AddToCart id={product.id} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
