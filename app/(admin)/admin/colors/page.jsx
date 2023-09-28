import React from "react"

import AdminColors from "@/components/admin/AdminColors"
import { fetchColors } from "@/components/actions/fetchColors"

export default async function AdminColorsPage({ params }) {
    const colors = await fetchColors()
    return <AdminColors colors={colors} />
}
