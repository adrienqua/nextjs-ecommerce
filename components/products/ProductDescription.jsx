"use client"
import Image from "next/image"
import React, { useState } from "react"
import ProductAttributes from "./ProductAttributes"
import AddToCart from "./AddToCart"

export default function ProductDescription({ product }) {
    const [selectedVariant, setSelectedVariant] = useState({})
    return (
        <div className="product-description flex flex-col lg:flex-row items-center">
            <div className="p-5 shrink-0">
                <Image
                    src={product.pictures.length > 0 ? product?.pictures?.[0]?.url : "/img/placeholder.jpg"}
                    width={500}
                    height={500}
                    alt={product.name}
                    className="rounded-xl"
                />
            </div>
            <div className="p-5 prose">
                <h1 className="text-3xl">{product.name}</h1>
                <p>{product.description}</p>

                <h4 className="font-bold">{parseFloat(selectedVariant?.price).toFixed(2)} €</h4>

                <ProductAttributes product={product} setSelectedVariant={setSelectedVariant} />

                <AddToCart id={selectedVariant?.id} />
            </div>
        </div>
    )
}
