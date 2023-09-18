import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "addresses"

export function newAddress(datas) {
    return axios.post(apiEndpoint, datas)
}

export function editAddress(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}
