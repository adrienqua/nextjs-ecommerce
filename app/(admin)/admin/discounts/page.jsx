import React from "react"

import AdminCategories from "@/components/admin/AdminCategories"
import { fetchDiscounts } from "@/components/actions/fetchDiscounts"
import AdminDiscounts from "@/components/admin/AdminDiscounts"

export default async function AdminCategoriesPage({ params }) {
    const discounts = await fetchDiscounts()

    return <AdminDiscounts discounts={discounts} />
}
