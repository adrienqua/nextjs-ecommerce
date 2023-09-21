import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "orders"

export function getOrders() {
    return axios.get(apiEndpoint).then((res) => res.data)
}