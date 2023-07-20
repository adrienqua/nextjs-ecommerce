import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "products"

export function getProducts() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
export function getFeaturedProducts() {
    return axios.get(apiEndpoint + "/" + "featured").then((res) => res.data)
}

export function getProduct(id) {
    return axios.get(apiEndpoint + "/" + id).then((res) => res.data)
}

export function newProduct(datas) {
    return axios.post(apiEndpoint, datas)
}

export function editProduct(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function deleteProduct(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
