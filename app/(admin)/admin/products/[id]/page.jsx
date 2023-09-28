import React from "react"
import Link from "next/link"

import { fetchCategories } from "@/components/actions/fetchCategories"
import { fetchColors } from "@/components/actions/fetchColors"
import { fetchProduct } from "@/components/actions/fetchProducts"
import { fetchSizes } from "@/components/actions/fetchSizes"
import ProductForm from "@/components/admin/form/ProductForm"

export default async function AdminEditProductPage({ params }) {
    const product = await fetchProduct(params.id)
    const categories = await fetchCategories()
    const colors = await fetchColors()
    const sizes = await fetchSizes()
    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Editer le produit {params.id}</h1>
                <Link href="/admin/products" className="btn btn-sm">
                    Retour
                </Link>
            </div>
            <ProductForm product={product} categories={categories} colors={colors} sizes={sizes} edit={true} />
        </div>
    )
}
