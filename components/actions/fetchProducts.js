"use server"

const { getProducts } = require("@/app/services/productAPI")

export async function fetchProducts(page = 1) {
    const datas = await getProducts(page)
    return datas
}
