import React from "react"
import ListingTable from "@/components/admin/ListingTable"
import Modal from "@/components/Modal"
import Sidebar from "@/components/admin/Sidebar"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import Form from "@/components/Form"
import Input from "@/components/Input"
import NewProduct from "@/components/admin/AdminNew"
import { getProducts, deleteProduct, newProduct, editProduct } from "@/app/services/productAPI"
import { getCategories } from "@/app/services/categoryAPI"
import { editProductApi } from "@/components/admin/editApi"
import { productSchema } from "@/prisma/validation"
import AdminProducts from "@/components/admin/AdminProducts"

const fetchProducts = async () => {
    "use server"
    const datas = await getProducts()
    return datas
}

const fetchCategories = async () => {
    "use server"
    const datas = await getCategories()
    return datas
}

export default async function AdminProductList({ params }) {
    const products = await fetchProducts()

    const categories = await fetchCategories()

    return <AdminProducts products={products} categories={categories} />
}
