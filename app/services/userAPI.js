import axios from "axios"
import { apiUrl } from "../config"

const apiEndpoint = apiUrl + "users"

export function getUser(id) {
    return axios.get(apiEndpoint + "/" + id).then((res) => res.data)
}

export function newUser(datas) {
    return axios.post("http://localhost:3000/api/users", datas)
}
