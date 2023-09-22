"use client"
import React, { useState, useEffect } from "react"
import Searchbar from "../Searchbar"
import ProductFilter from "./ProductFilter"
import ProductList from "./ProductList"
import { fetchProducts } from "../actions/fetchProducts"
import { handleScroll } from "@/utils/scroll"

export default function ProductContainer({ products, categories }) {
    const [productsList, setProductsList] = useState(products)
    const [productsFiltered, setProductsFiltered] = useState(null)
    const [page, setPage] = useState(1)
    const [scrolled, setScrolled] = useState(false)

    const fetchMoreProducts = async (page) => {
        const newProducts = await fetchProducts(page)
        if (newProducts.length === 0) {
            return setScrolled(true)
        }

        setProductsList([...productsList, ...newProducts])
    }

    useEffect(() => {
        page > 1 && fetchMoreProducts(page)
    }, [page])

    useEffect(() => {
        handleScroll(page, setPage, scrolled)
    }, [productsList])

    return (
        <div>
            <h1 className="text-center text-3xl">Produits</h1>

            <Searchbar />

            <ProductFilter setProductsFiltered={setProductsFiltered} categories={categories} />

            <ProductList products={Array.isArray(productsFiltered) ? productsFiltered : productsList} />
        </div>
    )
}
