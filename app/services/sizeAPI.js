import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "sizes"

export function getSizes() {
    return axios.get(apiEndpoint).then((res) => res.data)
}

export function newSize(datas) {
    return axios.post(apiEndpoint, datas)
}

export function editSize(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function deleteSize(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
