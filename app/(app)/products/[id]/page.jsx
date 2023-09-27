import { fetchProduct } from "@/components/actions/fetchProducts"
import ProductDetails from "@/components/products/ProductDetails"
import React from "react"

export async function generateMetadata({ params, searchParams }, parent) {
    const product = await fetchProduct(params.id)

    return {
        title: `${product.name} - Next.js ecommerce`,
    }
}

export default async function ProductDetailsPage({ params }) {
    const product = await fetchProduct(params.id)

    return (
        <div>
            <ProductDetails product={product} />
        </div>
    )
}
