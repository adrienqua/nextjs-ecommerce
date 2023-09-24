"use client"
import Image from "next/image"
import React, { useState } from "react"
import ProductAttributes from "./ProductAttributes"
import AddToCart from "./AddToCart"
import ProductReviews from "./ProductReviews"

export default function ProductDescription({ product }) {
    const [selectedVariant, setSelectedVariant] = useState({})
    return (
        <>
            <div className="product-description flex flex-col lg:flex-row lg:space-x-5">
                <div className="md:shrink-0 mb-5">
                    <Image
                        src={product.pictures.length > 0 ? product?.pictures?.[0]?.url : "/img/placeholder.jpg"}
                        width={500}
                        height={500}
                        alt={product.name}
                        className="rounded-xl shadow-sm"
                    />
                </div>
                <div className="">
                    <div className="p-5 prose bg-white rounded-xl px-10 py-10 shadow-sm mb-5">
                        <h1 className="text-3xl">{product.name}</h1>
                        <p>{product.description}</p>

                        <h4 className="font-bold">{parseFloat(selectedVariant?.price).toFixed(2)} €</h4>

                        <ProductAttributes product={product} setSelectedVariant={setSelectedVariant} />

                        <AddToCart id={selectedVariant?.id} />
                    </div>
                    <ProductReviews product={product} />
                </div>
            </div>
        </>
    )
}
