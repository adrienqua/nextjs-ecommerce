import React from "react"
import ProductForm from "@/components/admin/form/ProductForm"
import Link from "next/link"

import { fetchCategories } from "@/components/actions/fetchCategories"
import { fetchColors } from "@/components/actions/fetchColors"
import { fetchProduct } from "@/components/actions/fetchProducts"
import { fetchSizes } from "@/components/actions/fetchSizes"

export default async function AdminAddProductPage() {
    const categories = await fetchCategories()
    const colors = await fetchColors()
    const sizes = await fetchSizes()
    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Ajouter un produit</h1>
                <Link href="/admin/products" className="btn btn-sm">
                    Retour
                </Link>
            </div>
            <ProductForm categories={categories} colors={colors} sizes={sizes} />
        </div>
    )
}
