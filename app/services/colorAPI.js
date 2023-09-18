import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "colors"

export function getColors() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
