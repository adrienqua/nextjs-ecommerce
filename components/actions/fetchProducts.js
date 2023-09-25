"use server"

const { getProducts, getProduct } = require("@/app/services/productAPI")

export async function fetchProducts(page = 1) {
    const datas = await getProducts(page)
    return datas
}

export async function fetchProduct(id) {
    const datas = await getProduct(id)
    return datas
}
