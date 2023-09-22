"use server"

import { getSizes } from "@/app/services/sizeAPI"

export async function fetchSizes() {
    const datas = await getSizes()
    return datas
}
