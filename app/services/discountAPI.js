import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "discounts"

export function getDiscounts() {
    return axios.get(apiEndpoint).then((res) => res.data)
}

export function getDiscount(id) {
    return axios.get(`${apiEndpoint}/${id}`)
}

export function newDiscount(datas) {
    return axios.post(apiEndpoint, datas)
}

export function editDiscount(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function deleteDiscount(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
