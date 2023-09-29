"use client"
import React, { useEffect, useState } from "react"
import Form from "@/components/Form"
import Input from "@/components/Input"
import Modal from "@/components/Modal"

import { formatErrors } from "@/utils/formatErrors"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { editDiscount, newDiscount } from "@/app/services/discountAPI"

export default function DiscountForm({ data, edit = false }) {
    const [datas, setDatas] = useState(
        edit
            ? data
            : {
                  isActive: false,
                  isPercent: false,
              }
    )
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const handleSubmit = async (datas, id, closeModal) => {
        const formDatas = {
            code: datas.code,
            amount: parseInt(datas.amount),
            minCartPrice: parseInt(datas.minCartPrice),
            isPercent: datas.isPercent,
            isActive: datas.isActive,
        }
        try {
            if (edit) {
                await editDiscount(id, formDatas)
                toast.success("Code promo modifié !")
            } else {
                await newDiscount(formDatas)
                toast.success("Code promo ajouté !")
            }
            setErrors([])
            closeModal.click()
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleChange = (e, checked = false) => {
        let value
        if (checked) {
            value = e.target.checked
        } else {
            value = e.target.value
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    return (
        <Modal id={edit ? `edit-${data.id}` : `new-form`}>
            <Form modalId={edit ? `edit-${data.id}` : `new-form`} datas={datas} handleSubmit={handleSubmit} edit={true}>
                <Input
                    name="code"
                    label="Code"
                    value={datas.code}
                    handleChange={(e) => handleChange(e)}
                    error={errors.code}
                />
                <div className="flex">
                    <Input
                        name="amount"
                        label="Montant"
                        type="number"
                        value={datas.amount}
                        handleChange={(e) => handleChange(e)}
                        error={errors.amount}
                    />
                    <Input
                        name="isPercent"
                        label="Montant en %"
                        type="boolean"
                        checked={datas.isPercent}
                        handleChange={(e) => handleChange(e, true)}
                        error={errors.isPercent}
                    />
                </div>
                <Input
                    name="minCartPrice"
                    label="Prix requis au panier (€)"
                    type="number"
                    value={datas.minCartPrice}
                    handleChange={(e) => handleChange(e)}
                    error={errors.minCartPrice}
                />

                <Input
                    name="isActive"
                    label="Etat"
                    type="boolean"
                    checked={datas.isActive}
                    handleChange={(e) => handleChange(e, true)}
                    error={errors.isActive}
                />
            </Form>
        </Modal>
    )
}
