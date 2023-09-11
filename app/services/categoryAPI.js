import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "categories"

export function getCategories() {
    return axios.get(apiEndpoint).then((res) => res.data)
}

export function newCategory(datas) {
    return axios.post(apiEndpoint, datas)
}

export function editCategory(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function deleteCategory(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
