import React from "react"
import { getCategories } from "@/app/services/categoryAPI"
import CategoryList from "@/components/categories/CategoryList"

const fetchCategories = async () => {
    const datas = await getCategories()
    return datas
}

export default async function CategoriesPage() {
    const categories = await fetchCategories()
    return (
        <div>
            <h1 className="text-center text-3xl mb-4">Catégories</h1>
            <CategoryList categories={categories} />
        </div>
    )
}
