"use client"
import React from "react"
import ListingTable from "@/components/admin/ListingTable"
import NewProduct from "@/components/admin/NewProduct"
import {
    deleteProduct,
    editProduct,
    newProduct,
} from "@/app/services/productAPI"

export default function AdminProducts({ products, categories }) {
    const handleDelete = async (id) => {
        await deleteProduct(id)
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

                <NewProduct
                    id="new-form"
                    label="Ajouter un produit"
                    handleNew={handleNew}
                    categories={categories}
                />
            </div>

            <ListingTable
                datas={products}
                headerDatas={headerDatas}
                categories={categories}
                handleEdit={handleEdit}
            />
        </div>
    )
}
