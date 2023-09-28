import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "colors"

export function getColors() {
    return axios.get(apiEndpoint).then((res) => res.data)
}

export function newColor(datas) {
    return axios.post(apiEndpoint, datas)
}

export function editColor(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function deleteColor(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
