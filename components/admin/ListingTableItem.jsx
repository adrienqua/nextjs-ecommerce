"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import Form from "../Form"
import Input from "../Input"

export default function ListingTableItem({ data, headerDatas, categories }) {
    const pathname = usePathname()
    const [datas, setDatas] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: "",
    })

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    useEffect(() => {
        setDatas(data)
    }, [])

    return (
        <tr>
            {headerDatas.map((headerData) => (
                <>
                    {headerData.value === "price" ? (
                        <td key={headerData.value}>
                            {parseFloat(data[headerData.value]).toFixed(2)} €
                        </td>
                    ) : headerData.value === "id" ? (
                        <td key={headerData.value} className="font-bold">
                            {data[headerData.value]}
                        </td>
                    ) : headerData.action ? (
                        <td>
                            {headerData.value === "edit" && (
                                <>
                                    <label
                                        htmlFor={`edit-${data.id}`}
                                        className="btn btn-xs"
                                    >
                                        Editer
                                    </label>
                                    <Modal id={`edit-${data.id}`}>
                                        <h3 className="font-bold text-lg">
                                            Modifier {data.name}
                                        </h3>
                                        <Form
                                            handleSubmit={headerData.action}
                                            modalId={`edit-${data.id}`}
                                            datas={datas}
                                            edit={true}
                                        >
                                            <Input
                                                name="name"
                                                label="Nom"
                                                handleChange={(e) =>
                                                    handleChange(e)
                                                }
                                                value={datas.name}
                                            />
                                            <Input
                                                name="description"
                                                label="Description"
                                                type="textarea"
                                                handleChange={(e) =>
                                                    handleChange(e)
                                                }
                                                value={datas.description}
                                            />
                                            <Input
                                                name="price"
                                                label="Prix"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                handleChange={(e) =>
                                                    handleChange(e)
                                                }
                                                value={parseFloat(
                                                    datas.price
                                                ).toFixed(2)}
                                            />
                                            <Input
                                                name="categoryId"
                                                label="Catégorie"
                                                type="select"
                                                options={categories}
                                                handleChange={(e) =>
                                                    handleChange(e, true)
                                                }
                                                value={datas.categoryId}
                                            />
                                        </Form>
                                    </Modal>
                                </>
                            )}
                            {headerData.value === "delete" && (
                                <div>
                                    <label
                                        htmlFor={`delete-${data.id}`}
                                        className="btn btn-error btn-xs"
                                    >
                                        Supprimer
                                    </label>
                                    <Modal id={`delete-${data.id}`}>
                                        <h3 className="font-bold text-lg">
                                            Supprimer {data.name}
                                        </h3>
                                        <p className="py-4 text-center">
                                            Etes vous sûr de vouloir supprimer
                                            le produit <b>{data.name}</b> ?
                                        </p>
                                        <div className=" flex flex-col items-center">
                                            <button
                                                className="btn btn-error btn-sm"
                                                onClick={() =>
                                                    headerData.action(
                                                        parseInt(data.id)
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </Modal>
                                </div>
                            )}
                        </td>
                    ) : (
                        <td>{data[headerData.value]}</td>
                    )}
                </>
            ))}
        </tr>
    )
}
