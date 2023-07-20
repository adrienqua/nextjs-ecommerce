"use client"
import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import Input from "../Input"
import Form from "../Form"

export default function NewProduct({ id, label, handleSubmit, categories }) {
    const [datas, setDatas] = useState()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
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
                    />
                    <Input
                        name="description"
                        label="Description"
                        type="textarea"
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="price"
                        label="Prix"
                        type="number"
                        min="0"
                        step="0.01"
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="categoryId"
                        label="Catégorie"
                        type="select"
                        options={categories}
                        optionLabel="name"
                        handleChange={(e) => handleChange(e, true)}
                    />
                </Form>
            </Modal>
        </>
    )
}
