"use server"

import { apiUrl } from "@/app/(app)/config"
import { revalidate } from "./../../app/(app)/products/[id]/page"

const apiEndpoint = apiUrl + "products"

const { getProducts, getProduct, getFeaturedProducts, getProductsByCategory } = require("@/app/services/productAPI")

export async function fetchProducts(page = 1, userId) {
    //const datas = await getProducts(page, userId)
    const datas = fetch(`${apiEndpoint}?page=${page}&userId=${userId}`, { cache: "no-store" }).then((res) => res.json())
    return datas
}

export async function fetchProductsByCategory(page = 1, userId, slug) {
    //const datas = await getProductsByCategory(page, userId, slug)
    const datas = fetch(`${apiEndpoint}/categories?page=${page}&userId=${userId}&slug=${slug}`, {
        cache: "no-store",
    }).then((res) => res.json())
    return datas
}

export async function fetchProduct(id, userId) {
    //const datas = await getProduct(id, userId)
    const datas = fetch(`${apiEndpoint}/${id}?userId=${userId}`, { cache: "no-store" }).then((res) => res.json())
    return datas
}

export const fetchFeaturedProducts = async (userId) => {
    //const datas = await getFeaturedProducts(userId)
    const datas = fetch(`${apiEndpoint}/featured?userId=${userId}`, { cache: "no-store" }).then((res) => res.json())
    return datas
}

export const fetchFavoritesProducts = async (userId) => {
    const datas = fetch(`${apiEndpoint}/favorites/${userId}`, { cache: "no-store" }).then((res) => res.json())
    return datas
}
