import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "products"

export function getProducts(page, userId) {
    return axios.get(`${apiEndpoint}?page=${page}&userId=${userId}`).then((res) => res.data)
}

export function getFeaturedProducts(userId) {
    return axios.get(apiEndpoint + "/featured" + "?userId=" + userId).then((res) => res.data)
}

export function getProductsByCategory(page, userId, slug) {
    return axios.get(`${apiEndpoint}/categories?page=${page}&userId=${userId}&slug=${slug}`).then((res) => res.data)
}

export function getFilteredProducts(filterDatas, userId) {
    let filteredString = ""
    for (const [key, value] of Object.entries(filterDatas)) {
        let content = value
        if (value instanceof Array) {
            content = value.map((x) => x.id)
            console.log(content)
        }
        if (filteredString.length === 0) {
            filteredString += "?" + key + "=" + content
        } else {
            filteredString += "&" + key + "=" + content
        }
    }

    return axios.get(apiEndpoint + "/filter" + filteredString + "&userId=" + userId).then((res) => res.data)
}

export function getProduct(id, userId) {
    return axios.get(apiEndpoint + "/" + id + "?userId=" + userId).then((res) => res.data)
}

export function newProduct(datas) {
    return axios.post(apiEndpoint, datas, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export function editProduct(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function deleteProduct(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
