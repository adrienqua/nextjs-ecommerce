import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "users"

export function getUser(id) {
    return axios.get(apiEndpoint + "/" + id).then((res) => res.data)
}

export function newUser(datas) {
    return axios.post(apiEndpoint, datas)
}

export function editUser(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function getUserAddresses(id) {
    return axios.get(apiEndpoint + "/" + id + "/addresses").then((res) => res.data)
}
