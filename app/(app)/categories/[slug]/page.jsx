import React from "react"
import ProductContainer from "@/components/products/ProductContainer"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { fetchProductsByCategory } from "@/components/actions/fetchProducts"
import { fetchCategories } from "@/components/actions/fetchCategories"
import { fetchSizes } from "@/components/actions/fetchSizes"
import { fetchColors } from "@/components/actions/fetchColors"

export async function generateMetadata({ params, searchParams }, parent) {
    const categories = await fetchCategories()

    const category = categories.find((category) => category.slug === params.slug)

    return {
        title: `${category.name} - Next.js ecommerce`,
    }
}

export default async function ProductDetailsPage({ params }) {
    const session = await getServerSession(authOptions)
    const products = await fetchProductsByCategory(1, session?.user?.id, params.slug)
    const categories = await fetchCategories()
    const sizes = await fetchSizes()
    const colors = await fetchColors()
    const category = categories.find((category) => category.slug === params.slug)
    return (
        <div>
            <ProductContainer
                pageTitle={category.name}
                products={products}
                categories={categories}
                sizes={sizes}
                colors={colors}
                user={session?.user}
            />
        </div>
    )
}
