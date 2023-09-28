import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "favorites"

export function newFavorite(datas) {
    return axios.post(apiEndpoint, datas)
}
export function deleteFavorite(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
