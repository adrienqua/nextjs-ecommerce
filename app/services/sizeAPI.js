import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "sizes"

export function getSizes() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
