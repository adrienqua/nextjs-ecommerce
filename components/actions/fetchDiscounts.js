"use server"

import { getDiscounts } from "@/app/services/discountAPI"

export async function fetchDiscounts() {
    const datas = await getDiscounts()
    return datas
}
