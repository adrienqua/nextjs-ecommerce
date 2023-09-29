"use client"
import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import Input from "../Input"
import Form from "../Form"
import { useRouter } from "next/navigation"
import { formatErrors } from "@/utils/formatErrors"
import Dropzone from "react-dropzone"
import Link from "next/link"

export default function AdminNew({ id, label, handleNew, formDatas, url, formComponent }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState([])

    const router = useRouter()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseFloat(e.target.value)
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
            {url ? (
                <Link href={url} className="btn btn-primary btn-sm">
                    {label}
                </Link>
            ) : (
                <>
                    <label htmlFor={id} className="btn btn-primary btn-sm">
                        {label}
                    </label>
                    {formComponent ? (
                        formComponent
                    ) : (
                        <Modal id={`new-form`}>
                            <h3 className="font-bold text-lg">Ajouter un produit</h3>
                            <Form handleSubmit={handleSubmit} modalId={`new-form`} datas={datas}>
                                {formDatas.map((formData, index) => (
                                    <Input
                                        name={formData.name}
                                        label={formData.label}
                                        type={formData?.type || "input"}
                                        handleChange={
                                            formData.type === "file"
                                                ? (e) =>
                                                      setDatas({
                                                          ...datas,
                                                          files: e.target.files,
                                                      })
                                                : (e) => handleChange(e, formData.integer === true && true)
                                        }
                                        error={errors[formData.name]}
                                        {...(formData.type === "select" && {
                                            options: formData.options,
                                            optionLabel: formData.optionLabel,
                                        })}
                                        {...(formData.multiple === true && {
                                            multiple: true,
                                        })}
                                        key={index}
                                    />
                                ))}
                            </Form>
                        </Modal>
                    )}
                </>
            )}
        </>
    )
}
