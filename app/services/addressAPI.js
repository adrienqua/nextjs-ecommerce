import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "addresses"

export function newAddress(datas) {
    return axios.post(apiEndpoint, datas)
}
