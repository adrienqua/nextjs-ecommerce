"use client"
import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import Input from "../Input"
import Form from "../Form"
import { useRouter } from "next/navigation"
import { formatErrors } from "@/utils/formatErrors"

export default function NewProduct({ id, label, handleNew, categories }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState([])

    const router = useRouter()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleSubmit = async (datas, closeModal) => {
        try {
            await handleNew(datas)
            setErrors([])
            closeModal.click()
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    return (
        <>
            <label htmlFor={id} className="btn btn-primary btn-sm">
                {label}
            </label>
            <Modal id={`new-form`}>
                <h3 className="font-bold text-lg">Ajouter un produit</h3>
                <Form
                    handleSubmit={handleSubmit}
                    modalId={`new-form`}
                    datas={datas}
                >
                    <Input
                        name="name"
                        label="Nom"
                        handleChange={(e) => handleChange(e)}
                        error={errors.name}
                    />
                    <Input
                        name="description"
                        label="Description"
                        type="textarea"
                        handleChange={(e) => handleChange(e)}
                        error={errors.description}
                    />
                    <Input
                        name="price"
                        label="Prix"
                        type="number"
                        min="0"
                        step="0.01"
                        handleChange={(e) => handleChange(e)}
                        error={errors.price}
                    />
                    <Input
                        name="categoryId"
                        label="Catégorie"
                        type="select"
                        options={categories}
                        optionLabel="name"
                        handleChange={(e) => handleChange(e, true)}
                        error={errors.categoryId}
                    />
                </Form>
            </Modal>
        </>
    )
}
