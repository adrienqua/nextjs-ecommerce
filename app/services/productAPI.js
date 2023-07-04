import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "products"

export function getProducts() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
export function getFeaturedProducts() {
    return axios.get(apiEndpoint + "/" + "featured").then((res) => res.data)
}

export function newProduct(datas) {
    return axios.post("http://localhost:3000/api/products", datas)
}

export function editProduct(id, datas) {
    return axios
        .put("http://localhost:3000/api/products/" + id, datas)
        .then((res) => res.data)
}

export function deleteProduct(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
