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

    const handleSubmit = async (datas) => {
        "use server"
        await newProduct({
            name: datas.get("name"),
            description: datas.get("description"),
            price: datas.get("price"),
            categoryId: parseInt(datas.get("categoryId")),
        })
        revalidatePath("/products")
        // useSWR("/api/products")
    }

    return (
        <div>
            <h1 className="text-center text-3xl">Produits</h1>
            <Form handleSubmit={handleSubmit}>
                <Input name="name" label="Nom" />
                <Input name="description" label="Description" type="textarea" />
                <Input
                    name="price"
                    label="Prix"
                    type="number"
                    min="0"
                    step="0.01"
                />
                <Input
                    name="categoryId"
                    label="Catégorie"
                    type="select"
                    options={categories}
                />
            </Form>

            <Searchbar />

            <ProductList products={products} />
        </div>
    )
}
