import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import ProductList from "@/components/products/ProductList"
import Link from "next/link"
import React from "react"
import Slider from "@/components/Slider"
import { getFeaturedProducts } from "../services/productAPI"

const fetchFeaturedProducts = async () => {
    "use server"
    const datas = await getFeaturedProducts()
    return datas
}

export default async function HomePage() {
    const featuredProducts = await fetchFeaturedProducts()
    return (
        <>
            <Slider />

            <h2 className="h1 mb-4">Produits en vedette</h2>
            <ProductList products={featuredProducts} />
        </>
    )
}