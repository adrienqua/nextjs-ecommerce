"use server"

import { getCategories } from "@/app/services/categoryAPI"

export async function fetchCategories() {
    const datas = await getCategories()
    return datas
}
