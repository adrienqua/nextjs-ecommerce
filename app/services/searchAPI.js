import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "search"

export function searchProducts(query) {
    return axios.get(apiEndpoint + "?q=" + query).then((res) => res.data)
}
