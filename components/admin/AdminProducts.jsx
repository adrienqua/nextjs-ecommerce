"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import {
    deleteProduct,
    editProduct,
    newProduct,
} from "@/app/services/productAPI"
import { useRouter } from "next/navigation"

export default function AdminProducts({ products, categories }) {
    const [formDatas, setFormDatas] = useState([
        { label: "Nom", name: "name" },
        { label: "Description", name: "description", type: "textarea" },
        { label: "Prix", name: "price", type: "number", integer: true },
        {
            label: "Catégorie",
            name: "categoryId",
            type: "select",
            options: categories,
            optionLabel: "name",
            integer: true,
        },
        { label: "Quantité", name: "quantity", type: "number", integer: true },
    ])

    const router = useRouter()

    const handleDelete = async (id, closeModal) => {
        await deleteProduct(id)
        closeModal.click()
        router.refresh()
    }

    const handleEdit = async (id, datas) => {
        await editProduct(id, {
            name: datas.name,
            description: datas.description,
            price: parseFloat(datas.price),
            categoryId: datas.categoryId,
        })
    }

    const handleNew = async (datas) => {
        await newProduct({
            name: datas.name,
            description: datas.description,
            price: parseFloat(datas.price),
            categoryId: datas.categoryId,
            productVariants: [
                {
                    price: parseFloat(datas.price),
                    quantity: datas.quantity,
                },
            ],
        })
    }

    const headerDatas = [
        { label: "Id", value: "id" },
        { label: "Nom", value: "name" },
        { label: "Prix", value: "price" },

        { label: "", value: "edit", action: handleEdit },
        { label: "", value: "delete", action: handleDelete },
    ]

    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Produits</h1>

                <AdminNew
                    id="new-form"
                    label="Ajouter un produit"
                    handleNew={handleNew}
                    formDatas={formDatas}
                />
            </div>

            <ListingTable
                datas={products}
                headerDatas={headerDatas}
                formDatas={formDatas}
                categories={categories}
                handleEdit={handleEdit}
            />
        </div>
    )
}
