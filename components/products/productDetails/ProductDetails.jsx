"use client"
import Image from "next/image"
import React, { useState } from "react"
import ProductAttributes from "./ProductAttributes"
import AddToCart from "./AddToCart"
import ProductReviews from "./ProductReviews"
import ProductPictures from "./ProductPictures"
import ProductSpecifications from "./ProductSpecifications"
import Like from "../../Like"
import ReviewStars from "../ReviewStars"
import Link from "next/link"

export default function ProductDetails({ product, user }) {
    const [selectedVariant, setSelectedVariant] = useState({})
    return (
        <>
            <div className="product-description flex flex-col lg:flex-row lg:space-x-5">
                <div className=" mb-5 flex-initial min-w-[50%] lg:sticky lg:top-20 self-start w-full">
                    <ProductPictures product={product} />
                </div>
                <div className="flex-initial min-w-[50%]">
                    <div className="p-5 bg-white rounded-xl px-10 py-10 shadow-sm mb-5">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-3xl font-extrabold ">{product.name}</h1>
                                <Link href="#product-reviews">
                                    <div className="space-x-1 mb-4">
                                        <ReviewStars rating={product.averageRating} />
                                        <span className="text-gray-400 text-xs">{`${product.averageRating} (${product.ratingCount})`}</span>
                                    </div>
                                </Link>
                            </div>
                            <Like productId={product.id} favorites={product?.favorites} userId={user?.id} />
                        </div>
                        <p className="text-gray-500 leading-7 my-5">{product.description}</p>

                        <h4 className="font-bold">{parseFloat(selectedVariant?.price).toFixed(2)} €</h4>

                        <ProductAttributes product={product} setSelectedVariant={setSelectedVariant} />

                        <AddToCart id={selectedVariant?.id} />
                    </div>
                    <ProductSpecifications product={product} />
                    <ProductReviews product={product} />
                </div>
            </div>
        </>
    )
}
