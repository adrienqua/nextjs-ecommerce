import React from "react"
import { getCategories } from "@/app/services/categoryAPI"
import CategoryList from "@/components/categories/CategoryList"

const fetchCategories = async () => {
    "use server"
    const datas = await getCategories()
    console.log("datasssssssssssssssssss", datas)
    return datas
}

export default async function Categories() {
    const categories = await fetchCategories()
    return (
        <div>
            <h1 className="text-center text-3xl mb-4">Catégories</h1>
            <CategoryList categories={categories} />
        </div>
    )
}
