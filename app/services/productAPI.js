import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "products"

export function getProducts() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
export function getProduct(id) {
    return axios.get(apiEndpoint + "/" + id).then((res) => res.data)
}

export function newProduct(datas) {
    return axios.post("http://localhost:3000/api/products", datas)
}
