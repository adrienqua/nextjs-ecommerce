"use client"
import React, { useState } from "react"
import Searchbar from "../Searchbar"
import ProductFilter from "./ProductFilter"
import ProductList from "./ProductList"

export default function ProductContainer({ products, categories }) {
    const [productsFiltered, setProductsFiltered] = useState([])
    return (
        <div>
            <h1 className="text-center text-3xl">Produits</h1>

            <Searchbar />

            <ProductFilter
                setProductsFiltered={setProductsFiltered}
                categories={categories}
            />

            <ProductList
                products={
                    productsFiltered.length > 0 ? productsFiltered : products
                }
            />
        </div>
    )
}
