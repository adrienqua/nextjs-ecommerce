import React from "react"

import AdminSizes from "@/components/admin/AdminSizes"
import { fetchSizes } from "@/components/actions/fetchSizes"

export default async function AdminSizesPage({ params }) {
    const sizes = await fetchSizes()
    return <AdminSizes sizes={sizes} />
}
