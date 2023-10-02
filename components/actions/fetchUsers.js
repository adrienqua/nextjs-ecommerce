"use server"

import { getCategories } from "@/app/services/categoryAPI"
import { getUsers } from "@/app/services/userAPI"

export async function fetchUsers() {
    const datas = await getUsers()
    return datas
}
