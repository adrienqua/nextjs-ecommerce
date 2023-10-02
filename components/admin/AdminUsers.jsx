"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import { deleteUser, editUser, newUser } from "@/app/services/userAPI"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function AdminUsers({ users }) {
    const [formDatas, setFormDatas] = useState([
        { label: "Nom", name: "name" },
        { label: "Email", name: "email" },
        { label: "Mot de passe", name: "password" },
        { label: "Role", name: "role" },
    ])

    const router = useRouter()

    const handleDelete = async (id, closeModal) => {
        await deleteUser(id)
        closeModal.click()
        router.refresh()
        toast.success("Utilisateur supprimée !")
    }

    const handleEdit = async (id, datas) => {
        await editUser(id, {
            name: datas.name,
            email: datas.email,
            password: datas.password,
            role: datas.role,
        })
        toast.success("Utilisateur modifiée !")
    }

    const handleNew = async (datas) => {
        await newUser({
            name: datas.name,
            email: datas.email,
            password: datas.password,
            role: datas.role,
        })
        toast.success("Utilisateur ajoutée !")
    }

    const headerDatas = [
        { label: "Id", value: "id" },
        { label: "Nom", value: "name" },
        { label: "Email", value: "email" },
        { label: "Role", value: "role", type: "badge" },
        { label: "", value: "edit", action: handleEdit },
        { label: "", value: "delete", action: handleDelete },
    ]
    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Utilisateurs</h1>

                <AdminNew id="new-form" label="Ajouter un utilisateur" handleNew={handleNew} formDatas={formDatas} />
            </div>

            <ListingTable datas={users} headerDatas={headerDatas} formDatas={formDatas} handleEdit={handleEdit} />
        </div>
    )
}
