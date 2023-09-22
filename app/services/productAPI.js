import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "products"

export function getProducts(page) {
    return axios.get(`${apiEndpoint}?page=${page}`).then((res) => res.data)
}

export function getFeaturedProducts() {
    return axios.get(apiEndpoint + "/featured").then((res) => res.data)
}

export function getFilteredProducts(filterDatas) {
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

    return axios.get(apiEndpoint + "/filter" + filteredString).then((res) => res.data)
}

export function getProduct(id) {
    return axios.get(apiEndpoint + "/" + id).then((res) => res.data)
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
