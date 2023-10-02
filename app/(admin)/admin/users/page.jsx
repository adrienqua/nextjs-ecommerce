import React from "react"

import AdminCategories from "@/components/admin/AdminCategories"
import { fetchUsers } from "@/components/actions/fetchUsers"
import AdminUsers from "@/components/admin/AdminUsers"

export default async function AdminCategoriesPage({ params }) {
    const users = await fetchUsers()

    return <AdminUsers users={users} />
}
