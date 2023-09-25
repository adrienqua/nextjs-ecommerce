import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "pictures"

export function deletePicture(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
