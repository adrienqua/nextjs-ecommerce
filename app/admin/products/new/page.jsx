import { getCategories } from "@/app/services/categoryAPI"
import { newProduct } from "@/app/services/productAPI"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { redirect } from "next/navigation"
import React from "react"

const fetchCategories = async () => {
    "use server"
    const datas = await getCategories()
    return datas
}

export default async function adminProductNew() {
    const categories = await fetchCategories()

    const handleSubmit = async (datas) => {
        "use server"
        await newProduct({
            name: datas.get("name"),
            description: datas.get("description"),
            price: datas.get("price"),
            categoryId: parseInt(datas.get("categoryId")),
        })
        redirect("/admin/products")
    }

    return (
        <div>
            <h1 className="h1">Ajouter un produit</h1>
            <Form handleSubmit={handleSubmit}>
                <Input name="name" label="Nom" />
                <Input name="description" label="Description" type="textarea" />
                <Input
                    name="price"
                    label="Prix"
                    type="number"
                    min="0"
                    step="0.01"
                />
                <Input
                    name="categoryId"
                    label="Catégorie"
                    type="select"
                    options={categories}
                />
            </Form>
        </div>
    )
}
