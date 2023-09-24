import axios from "axios"
import { apiUrl } from "../(app)/config"

const apiEndpoint = apiUrl + "reviews"

export function getReviews() {
    return axios.get(apiEndpoint).then((res) => res.data)
}
export function newReview(datas) {
    return axios.post(apiEndpoint, datas)
}
export function editReview(id, datas) {
    return axios.put(apiEndpoint + "/" + id, datas).then((res) => res.data)
}

export function deleteReview(id) {
    return axios.delete(apiEndpoint + "/" + id)
}
