"use client"
import React, { useState } from "react"
import ListingTable from "@/components/admin/ListingTable"
import { editCategory } from "@/app/services/categoryAPI"
import { deleteOrder } from "@/app/services/ordersAPI"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AdminOrders({ orders }) {
    const [formDatas, setFormDatas] = useState([{ label: "Nom", name: "name" }])

    const router = useRouter()

    const handleDelete = async (id, closeModal) => {
        await deleteOrder(id)
        closeModal.click()
        router.refresh()
        toast.success("Commande supprimée !")
    }

    const handleDetails = async (id, datas) => {
        await editCategory(id, {
            name: datas.name,
        })
    }

    const headerDatas = [
        { label: "Commande", value: "orderNumber" },
        { label: "Total", value: "total", type: "price" },
        { label: "Statut", value: "status", type: "badge" },
        { label: "", value: "details", action: handleDetails },
        { label: "", value: "delete", action: handleDelete },
    ]

    const detailsDatas = [
        { label: "Commande", value: "orderNumber" },
        { label: "Statut", value: "status", type: "badge" },
        { label: "Client", value: "user.email" },
        { label: "Adresse", value: "address" },
        {
            label: "Contenu de la commande",
            value: "orderItems",
            orderItems: ["quantity", "product", "color", "size", "price"],
        },
        { label: "Transporteur", value: "carrierName" },
        { label: "Sous total", value: "subTotal", format: "price" },
        { label: "Frais de port", value: "carrierPrice", format: "price" },
        { label: "Total", value: "total", format: "price" },
    ]
    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Commandes</h1>
            </div>

            <ListingTable
                datas={orders}
                headerDatas={headerDatas}
                formDatas={formDatas}
                handleDetails={handleDetails}
                detailsDatas={detailsDatas}
            />
        </div>
    )
}
