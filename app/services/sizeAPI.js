import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "sizes"

export function getSizes() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
