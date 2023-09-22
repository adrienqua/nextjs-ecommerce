"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import { deleteCategory, editCategory, newCategory } from "@/app/services/categoryAPI"

export default function AdminOrders({ orders }) {
    const [formDatas, setFormDatas] = useState([{ label: "Nom", name: "name" }])

    const handleDelete = async (id) => {
        await deleteCategory(id)
    }

    const handleDetails = async (id, datas) => {
        await editCategory(id, {
            name: datas.name,
        })
    }

    const headerDatas = [
        { label: "Id", value: "id" },
        { label: "Statut", value: "status" },
        { label: "", value: "details", action: handleDetails },
        { label: "", value: "delete", action: handleDelete },
    ]

    const detailsDatas = [
        { label: "Id", value: "id" },
        { label: "Statut", value: "status" },
        { label: "Client", value: "user.email" },
        { label: "Adresse", value: "address" },
        { label: "Transporteur", value: "carrierName" },
        {
            label: "Contenu de lka commande",
            value: "orderItems",
            orderItems: ["quantity", "product", "price"],
        },
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
