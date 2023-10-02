"use server"

const { getProducts, getProduct, getFeaturedProducts, getProductsByCategory } = require("@/app/services/productAPI")

export async function fetchProducts(page = 1, userId) {
    const datas = await getProducts(page, userId)
    return datas
}

export async function fetchProductsByCategory(page = 1, userId, slug) {
    const datas = await getProductsByCategory(page, userId, slug)
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
