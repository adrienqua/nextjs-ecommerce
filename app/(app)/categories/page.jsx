import React from "react"
import { getCategories } from "@/app/services/categoryAPI"
import CategoryList from "@/components/categories/CategoryList"

export async function generateMetadata({ params, searchParams }, parent) {
    return {
        title: `Catégories - Next.js ecommerce`,
    }
}

const fetchCategories = async () => {
    "use server"
    const datas = await getCategories()
    return datas
}

export default async function CategoryPage() {
    const categories = await fetchCategories()

    return (
        <div>
            <h1 className="text-center text-3xl mb-4 font-bold">Catégories</h1>
            <CategoryList categories={categories} />
        </div>
    )
}
