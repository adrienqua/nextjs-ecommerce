"use server"

import { getColors } from "@/app/services/colorAPI"

export async function fetchColors() {
    const datas = await getColors()
    return datas
}
