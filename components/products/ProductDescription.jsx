"use client"
import Image from "next/image"
import React, { useState } from "react"
import ProductAttributes from "./ProductAttributes"
import AddToCart from "./AddToCart"
import ProductReviews from "./ProductReviews"
import ProductPictures from "./ProductPictures"

export default function ProductDescription({ product }) {
    const [selectedVariant, setSelectedVariant] = useState({})
    return (
        <>
            <div className="product-description flex flex-col lg:flex-row lg:space-x-5">
                <div className=" mb-5 flex-initial min-w-[50%] sticky top-20 self-start">
                    <ProductPictures product={product} />
                </div>
                <div className="flex-initial min-w-[50%]">
                    <div className="p-5 bg-white rounded-xl px-10 py-10 shadow-sm mb-5">
                        <h1 className="text-3xl font-extrabold mb-6">{product.name}</h1>
                        <p className="text-gray-500 leading-7 my-5">{product.description}</p>

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
