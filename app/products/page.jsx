import React from "react"

import ProductContainer from "@/components/products/ProductContainer"

import { getProducts } from "@/app/services/productAPI"
import { getCategories } from "../services/categoryAPI"
import { getSizes } from "../services/sizeAPI"
import { getColors } from "../services/colorAPI"

const fetchProducts = async () => {
    "use server"
    const datas = await getProducts()
    return datas
}

const fetchCategories = async () => {
    "use server"
    const datas = await getCategories()
    return datas
}

const fetchSizes = async () => {
    "use server"
    const datas = await getSizes()
    return datas
}

const fetchColors = async () => {
    "use server"
    const datas = await getColors()
    return datas
}

export default async function ProductsPage() {
    const products = await fetchProducts()
    const categories = await fetchCategories()
    const sizes = await fetchSizes()
    const colors = await fetchColors()

    return (
        <ProductContainer
            products={products}
            categories={categories}
            sizes={sizes}
            colors={colors}
        />
    )
}
