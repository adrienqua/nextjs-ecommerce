import React, { useEffect, useState } from "react"

import ProductReviewItem from "./ProductReviewItem"
import ProductReviewNew from "./ProductReviewNew"

export default function ProductReviews({ product }) {
    return (
        <div className="bg-white rounded-xl px-10 py-10 shadow-sm">
            <h2 className="h1 mb-4">Commentaires client</h2>
            <ProductReviewNew product={product} />

            <div className="reviews mt-5 space-y-4">
                {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                        <ProductReviewItem key={review.id} review={review} productId={product.id} />
                    ))
                ) : (
                    <p className="text-gray-500 leading-7">
                        Pas de commentaire, soyez le premier à donner votre avis !
                    </p>
                )}
            </div>
        </div>
    )
}
