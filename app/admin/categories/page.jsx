import React from "react"

import { getCategories } from "@/app/services/categoryAPI"

import AdminProducts from "@/components/admin/AdminProducts"
import AdminCategories from "@/components/admin/AdminCategories"

const fetchCategories = async () => {
    const datas = await getCategories()
    return datas
}

export default async function AdminCategoriesList({ params }) {
    const categories = await fetchCategories()

    return <AdminCategories categories={categories} />
}
