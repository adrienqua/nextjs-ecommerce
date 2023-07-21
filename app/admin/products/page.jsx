import React from "react"
import ListingTable from "@/components/admin/ListingTable"
import Modal from "@/components/Modal"
import Sidebar from "@/components/admin/Sidebar"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import Form from "@/components/Form"
import Input from "@/components/Input"
import NewProduct from "@/components/admin/NewProduct"
import {
    getProducts,
    deleteProduct,
    newProduct,
    editProduct,
} from "@/app/services/productAPI"
import { getCategories } from "@/app/services/categoryAPI"

const fetchProducts = async () => {
    const datas = await getProducts()
    return datas
}

const fetchCategories = async () => {
    const datas = await getCategories()
    return datas
}

export default async function AdminProductList({ params }) {
    const products = await fetchProducts()

    const categories = await fetchCategories()

    const handleDelete = async (id) => {
        "use server"
        await deleteProduct(id)
        revalidatePath("/admin/products")
    }

    const handleEdit = async (id, datas) => {
        "use server"
        await editProduct(id, {
            name: datas.name,
            description: datas.description,
            price: datas.price,
            categoryId: datas.categoryId,
        })
        revalidatePath("/admin/products")
    }

    const handleSubmitNew = async (datas) => {
        "use server"
        await newProduct(datas)
        revalidatePath("/admin/products")
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
                    handleSubmit={handleSubmitNew}
                    categories={categories}
                />
            </div>

            <ListingTable
                datas={products}
                headerDatas={headerDatas}
                categories={categories}
            />
        </div>
    )
}
