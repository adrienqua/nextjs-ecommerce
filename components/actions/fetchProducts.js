"use server"

const { getProducts, getProduct, getFeaturedProducts } = require("@/app/services/productAPI")

export async function fetchProducts(page = 1, userId) {
    const datas = await getProducts(page, userId)
    return datas
}

export async function fetchProduct(id, userId) {
    const datas = await getProduct(id, userId)
    return datas
}

export const fetchFeaturedProducts = async (userId) => {
    const datas = await getFeaturedProducts(userId)
    return datas
}
