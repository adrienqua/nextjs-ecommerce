import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import ProductList from "@/components/products/ProductList"
import Link from "next/link"
import React from "react"
import { getFeaturedProducts } from "./services/productAPI"

const fetchFeaturedProducts = async () => {
    const datas = await getFeaturedProducts()
    return datas
}

const HomePage = async () => {
    const featuredProducts = await fetchFeaturedProducts()
    return (
        <>
            <div>
                <Searchbar />

                <h2 className="h1 mb-4">Produits en vedette</h2>
                <ProductList products={featuredProducts} />
            </div>
        </>
    )
}

export default HomePage
