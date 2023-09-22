"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import { deleteProduct, editProduct, newProduct } from "@/app/services/productAPI"
import { useRouter } from "next/navigation"

export default function AdminProducts({ products, categories }) {
    const [formDatas, setFormDatas] = useState([
        { label: "Nom", name: "name" },
        { label: "Images", name: "files", type: "file", multiple: true },
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
        const formData = new FormData()

        formData.set("name", datas.name)
        formData.set("description", datas.description)
        formData.set("price", parseFloat(datas.price))
        formData.set("categoryId", datas.categoryId)

        if (typeof datas.files !== "undefined") {
            for (let i = 0; i < datas.files.length; i++) {
                formData.append("files", datas.files[i])
            }
        }

        await editProduct(id, formData)
    }

    const handleNew = async (datas) => {
        const formData = new FormData()
        formData.set("name", datas.name)
        formData.set("description", datas.description)
        formData.set("price", parseFloat(datas.price))
        formData.set("categoryId", datas.categoryId)
        formData.set(
            "productVariants",
            JSON.stringify([
                {
                    price: parseFloat(datas.price),
                    quantity: datas.quantity,
                },
            ])
        )

        if (typeof datas.files !== "undefined") {
            for (let i = 0; i < datas.files.length; i++) {
                formData.append("files", datas.files[i])
            }
        }

        await newProduct(formData)
    }

    const headerDatas = [
        { label: "Id", value: "id" },
        { label: "Image", value: "pictures", type: "picture" },
        { label: "Nom", value: "name" },
        { label: "Prix", value: "price", type: "price" },
        { label: "", value: "edit", action: handleEdit },
        { label: "", value: "delete", action: handleDelete },
    ]

    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Produits</h1>

                <AdminNew id="new-form" label="Ajouter un produit" handleNew={handleNew} formDatas={formDatas} />
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
