"use client"
import React, { useState } from "react"
import AdminNew from "@/components/admin/AdminNew"
import ListingTable from "@/components/admin/ListingTable"
import DiscountForm from "./form/DiscountForm"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { deleteDiscount, editDiscount, newDiscount } from "@/app/services/discountAPI"

export default function AdminDiscounts({ discounts }) {
    const [formDatas, setFormDatas] = useState([
        { label: "Code", name: "code" },
        { label: "Montant", name: "amount", type: "number", integer: true },
        { label: "Prix requis au panier (€)", name: "minCartPrice", type: "number", integer: true },
        { label: "Montant en %", name: "isPercent", type: "boolean" },
        { label: "Etat", name: "isActive", type: "boolean" },
    ])

    const router = useRouter()

    const handleDelete = async (id, closeModal) => {
        await deleteDiscount(id)
        closeModal.click()
        router.refresh()
        toast.success("Code promo supprimée !")
    }

    const handleEdit = async (id, datas) => {
        await editDiscount(id, {
            code: datas.code,
            amount: datas.amount,
            minCartPrice: datas.minCartPrice,
        })
        toast.success("Code promo modifiée !")
    }

    const handleNew = async (datas) => {
        await newDiscount({
            code: datas.code,
            amount: datas.amount,
            minCartPrice: datas.minCartPrice,
        })
        toast.success("Code promo ajoutée !")
    }

    const headerDatas = [
        { label: "Code", value: "code" },
        { label: "Montant promo", value: "amount" },
        { label: "Si panier <", value: "minCartPrice", type: "price" },
        { label: "", value: "edit", action: handleEdit },
        { label: "", value: "delete", action: handleDelete },
    ]
    return (
        <div className="bg-white rounded-xl px-8 py-6 shadow-sm">
            <div className="flex justify-between  items-center">
                <h1 className="h1 ">Codes promo</h1>

                <AdminNew
                    id="new-form"
                    label="Ajouter un code promo"
                    handleNew={handleNew}
                    formComponent={<DiscountForm />}
                />
            </div>

            <ListingTable
                datas={discounts}
                headerDatas={headerDatas}
                handleEdit={handleEdit}
                formComponent={<DiscountForm edit={true} />}
            />
        </div>
    )
}
