import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "search"

export function searchProducts(query) {
    return axios.get(apiEndpoint + "?q=" + query).then((res) => res.data)
}
