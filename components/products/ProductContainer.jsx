"use client"
import React, { useState, useEffect } from "react"
import Searchbar from "../Searchbar"
import ProductFilter from "./ProductFilter"
import ProductList from "./ProductList"
import { fetchProducts } from "../actions/fetchProducts"
import { handleScroll } from "@/utils/scroll"

export default function ProductContainer({ products, categories, user }) {
    const [productsList, setProductsList] = useState(products)
    const [productsFiltered, setProductsFiltered] = useState(null)
    const [page, setPage] = useState(1)
    const [scrolled, setScrolled] = useState(false)

    const fetchMoreProducts = async (page, userId) => {
        const newProducts = await fetchProducts(page, userId)
        if (newProducts.length === 0) {
            return setScrolled(true)
        }

        setProductsList([...productsList, ...newProducts])
    }

    useEffect(() => {
        page > 1 && fetchMoreProducts(page, user?.id)
    }, [page])

    useEffect(() => {
        handleScroll(page, setPage, scrolled)
    }, [productsList])

    useEffect(() => {
        setProductsList(products)
    }, [products])

    return (
        <div>
            <h1 className="text-center text-3xl mb-5 font-bold">Produits</h1>

            <ProductFilter setProductsFiltered={setProductsFiltered} categories={categories} user={user} />

            <ProductList products={Array.isArray(productsFiltered) ? productsFiltered : productsList} user={user} />
        </div>
    )
}
