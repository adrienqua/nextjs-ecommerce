import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "cart"

export function getCart(idArray) {
    return axios.post(apiEndpoint, { idArray: idArray }).then((res) => res.data)
}
