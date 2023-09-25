import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "orders"

export function getOrders() {
    return axios.get(apiEndpoint).then((res) => res.data)
}

export function deleteOrder(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
