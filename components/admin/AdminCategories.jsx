"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import {
    deleteCategory,
    editCategory,
    newCategory,
} from "@/app/services/categoryAPI"

export default function AdminCategories({ categories }) {
    const [formDatas, setFormDatas] = useState([{ label: "Nom", name: "name" }])

    const handleDelete = async (id) => {
        await deleteCategory(id)
    }

    const handleEdit = async (id, datas) => {
        await editCategory(id, {
            name: datas.name,
        })
    }

    const handleNew = async (datas) => {
        await newCategory({
            name: datas.name,
        })
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
