import React from "react"
import AdminOrders from "@/components/admin/AdminOrders"
import { getOrders } from "@/app/services/ordersAPI"

const fetchOrders = async () => {
    "use server"
    const datas = await getOrders()
    return datas
}

export default async function AdminOrderList({ params }) {
    const orders = await fetchOrders()

    return <AdminOrders orders={orders} />
}
