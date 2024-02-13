import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import ProductList from "@/components/products/ProductList"
import Link from "next/link"
import React from "react"
import Slider from "@/components/Slider"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { fetchFeaturedProducts } from "@/components/actions/fetchProducts"

export async function generateMetadata({ params, searchParams }, parent) {
    return {
        title: `Vêtements de qualité - Next.js ecommerce`,
    }
}

export default async function HomePage() {
    const session = await getServerSession(authOptions)
    console.log(session?.user)
    const featuredProducts = await fetchFeaturedProducts(session?.user?.id)
    return (
        <>
            <Slider />

            <h2 className="h1 mb-4">Produits en vedette</h2>
            <ProductList products={featuredProducts} user={session?.user} />
        </>
    )
}
