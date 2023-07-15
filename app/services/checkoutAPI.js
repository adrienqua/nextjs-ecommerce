import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "checkout"

export function newOrder(datas) {
    return axios.post(apiEndpoint, datas)
}
