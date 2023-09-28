"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { deleteColor, editColor, newColor } from "@/app/services/colorAPI"
import { deleteSize, editSize, newSize } from "@/app/services/sizeAPI"

export default function AdminSizes({ sizes }) {
    const [formDatas, setFormDatas] = useState([{ label: "Nom", name: "name" }])

    const router = useRouter()

    const handleDelete = async (id, closeModal) => {
        await deleteSize(id)
        closeModal.click()
        router.refresh()
        toast.success("Taille supprimée !")
    }

    const handleEdit = async (id, datas) => {
        await editSize(id, {
            name: datas.name,
        })
        toast.success("Taille modifiée !")
    }

    const handleNew = async (datas) => {
        await newSize({
            name: datas.name,
        })
        toast.success("Taille ajoutée !")
    }

    const headerDatas = [
        { label: "Id", value: "id" },
        { label: "Nom", value: "name" },
        { label: "", value: "edit", action: handleEdit },
        { label: "", value: "delete", action: handleDelete },
    ]
    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Tailles</h1>

                <AdminNew id="new-form" label="Ajouter une catégorie" handleNew={handleNew} formDatas={formDatas} />
            </div>

            <ListingTable datas={sizes} headerDatas={headerDatas} formDatas={formDatas} handleEdit={handleEdit} />
        </div>
    )
}
