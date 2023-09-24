import React, { useEffect, useState } from "react"

import ProductReviewItem from "./ProductReviewItem"
import ProductReviewNew from "./ProductReviewNew"

export default function ProductReviews({ product }) {
    return (
        <div className="bg-white rounded-xl px-10 py-8 shadow-sm">
            <h2 className="h1 mb-4">Commentaires client</h2>
            <ProductReviewNew product={product} />

            <div className="reviews mt-5 space-y-4">
                {product.reviews.map((review) => (
                    <ProductReviewItem key={review.id} review={review} productId={product.id} />
                ))}
            </div>
        </div>
    )
}
