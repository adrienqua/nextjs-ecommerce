import React from "react"
import { fetchProduct } from "@/components/actions/fetchProducts"
import ProductDetails from "@/components/products/productDetails/ProductDetails"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"

export async function generateMetadata({ params, searchParams }, parent) {
    const product = await fetchProduct(params.id)

    return {
        title: `${product.name} - Next.js ecommerce`,
    }
}

export default async function ProductDetailsPage({ params }) {
    const session = await getServerSession(authOptions)
    const product = await fetchProduct(params.id, session?.user?.id)

    return (
        <div>
            <ProductDetails product={product} user={session?.user} />
        </div>
    )
}
