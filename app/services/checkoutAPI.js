import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "checkout"

export function newOrder(datas) {
    return axios.post(apiEndpoint, datas)
}
