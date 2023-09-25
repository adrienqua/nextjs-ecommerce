"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import { deleteCategory, editCategory, newCategory } from "@/app/services/categoryAPI"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function AdminCategories({ categories }) {
    const [formDatas, setFormDatas] = useState([{ label: "Nom", name: "name" }])

    const router = useRouter()

    const handleDelete = async (id, closeModal) => {
        await deleteCategory(id)
        closeModal.click()
        router.refresh()
        toast.success("Catégorie supprimée !")
    }

    const handleEdit = async (id, datas) => {
        await editCategory(id, {
            name: datas.name,
        })
        toast.success("Catégorie modifiée !")
    }

    const handleNew = async (datas) => {
        await newCategory({
            name: datas.name,
        })
        toast.success("Catégorie ajoutée !")
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
                <h1 className="h1 ">Catégories</h1>

                <AdminNew
                    id="new-form"
                    label="Ajouter une catégorie"
                    handleNew={handleNew}
                    categories={categories}
                    formDatas={formDatas}
                />
            </div>

            <ListingTable
                datas={categories}
                headerDatas={headerDatas}
                formDatas={formDatas}
                categories={categories}
                handleEdit={handleEdit}
            />
        </div>
    )
}
