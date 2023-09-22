"use client"

import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"
import { searchProducts } from "../../services/searchAPI"
import Searchbar from "@/components/Searchbar"
import ProductList from "@/components/products/ProductList"
import Loading from "@/components/Loading"

export default function SearchPage({ params }) {
    const searchParams = useSearchParams()

    const query = searchParams.get("q")

    const [products, setProducts] = useState([])

    console.log(query)

    useEffect(() => {
        fetchProducts(query)
    }, [query])

    const fetchProducts = async (query) => {
        setProducts(await searchProducts(query))
    }

    return (
        <div>
            <h1 className="text-center text-3xl mb-5 font-bold">Produits</h1>
            <Suspense fallback={<Loading />}>
                <ProductList products={products} />
            </Suspense>
        </div>
    )
}
