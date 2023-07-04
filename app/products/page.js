import React from "react"
import { GET } from "../api/products/route"
import Input from "@/components/Input"
import Form from "@/components/Form"
import { getProducts, newProduct } from "../services/productAPI"
import { getCategories } from "../services/categoryAPI"
import Image from "next/image"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import Searchbar from "@/components/Searchbar"
import ProductList from "@/components/products/ProductList"

const fetchProducts = async () => {
    const datas = await getProducts()
    return datas
}

const fetchCategories = async () => {
    const datas = await getCategories()
    return datas
}

export default async function ProductsPage() {
    const products = await fetchProducts()
    const categories = await fetchCategories()

    return (
        <div>
            <h1 className="text-center text-3xl">Produits</h1>

            <Searchbar />

            <ProductList products={products} />
        </div>
    )
}
