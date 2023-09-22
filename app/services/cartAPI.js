import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "cart"

export function getCart(idArray) {
    return axios.post(apiEndpoint, { idArray: idArray })
}
