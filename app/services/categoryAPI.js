import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "categories"

export function getCategories() {
    return axios.get(apiEndpoint).then((res) => res.data)
}

export function newCategory(datas) {
    return axios.post(apiEndpoint, datas)
}
