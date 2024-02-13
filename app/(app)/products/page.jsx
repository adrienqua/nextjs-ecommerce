import React from "react"

import ProductContainer from "@/components/products/ProductContainer"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { fetchProducts } from "@/components/actions/fetchProducts"
import { fetchCategories } from "@/components/actions/fetchCategories"
import { fetchSizes } from "@/components/actions/fetchSizes"
import { fetchColors } from "@/components/actions/fetchColors"

export async function generateMetadata({ params, searchParams }, parent) {
    return {
        title: `Nos vêtements - Next.js ecommerce`,
    }
}

export default async function ProductsPage() {
    const session = await getServerSession(authOptions)
    const products = await fetchProducts(1, session?.user?.id)
    const categories = await fetchCategories()
    const sizes = await fetchSizes()
    const colors = await fetchColors()

    return (
        <ProductContainer
            pageTitle="Produits"
            products={products}
            categories={categories}
            sizes={sizes}
            colors={colors}
            user={session?.user}
        />
    )
}
