"use client"
import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import Input from "../Input"
import Form from "../Form"
import { formatErrors } from "@/utils/formatErrors"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { editUser } from "@/app/services/userAPI"

export default function AccountInformations({ user }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseFloat(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleSubmit = async (id, datas, closeModal) => {
        try {
            await editUser(id, {
                email: datas.email,
                name: datas.name,
                password: datas.password,
            })
            setErrors([])
            closeModal.click()
            toast.success("Informations modifiées")
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    useEffect(() => {
        setDatas(user)
    }, [])

    return (
        <Modal id={`user-informations`}>
            <h3 className="font-bold text-lg mb-3">
                Modifier mes informations
            </h3>
            <Form
                edit={true}
                datas={datas}
                handleSubmit={handleSubmit}
                modalId={`user-informations`}
            >
                <Input
                    name="email"
                    label="Email"
                    value={datas.email}
                    handleChange={(e) => handleChange(e)}
                    error={errors.email}
                />
                <Input
                    name="password"
                    label="Mot de passe"
                    type="password"
                    value={datas.password}
                    handleChange={(e) => handleChange(e)}
                    error={errors.password}
                />
                <Input
                    name="name"
                    label="Nom"
                    value={datas.name}
                    handleChange={(e) => handleChange(e)}
                    error={errors.name}
                />
            </Form>
        </Modal>
    )
}
