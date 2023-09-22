import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "carriers"

export function getCarriers() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
