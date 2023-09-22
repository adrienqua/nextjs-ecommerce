"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import Modal from "../Modal"
import Form from "../Form"
import Input from "../Input"
import { editProduct } from "@/app/services/productAPI"
import { formatErrors } from "@/utils/formatErrors"
import { DisplayNestedProperties } from "@/utils/displayNestedProperties"
import { formatPrice } from "@/utils/formatPrice"

export default function ListingTableItem({ data, headerDatas, handleEdit, formDatas, detailsDatas }) {
    const pathname = usePathname()

    const router = useRouter()

    const closeModalRef = useRef(null)

    const [datas, setDatas] = useState({
        name: "",
        description: "",
        price: "",
        categoryId: "",
    })
    const [errors, setErrors] = useState([])

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseFloat(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleSubmit = async (id, datas, closeModal) => {
        try {
            await handleEdit(id, datas)
            setErrors([])
            closeModal.click()
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    useEffect(() => {
        setDatas(data)
    }, [])

    return (
        <tr>
            {headerDatas.map((headerData, index) => (
                <React.Fragment key={index}>
                    {headerData.type === "picture" ? (
                        <td key={headerData.value}>
                            <Image
                                src={data[headerData.value][0]?.url}
                                width={50}
                                height={50}
                                alt={data[headerData.value][0]?.url}
                                className="rounded-lg"
                            />
                        </td>
                    ) : headerData.type === "price" ? (
                        <td key={headerData.value}>{parseFloat(data[headerData.value]).toFixed(2)} €</td>
                    ) : index === 0 ? (
                        <td key={headerData.value} className="font-bold">
                            {data[headerData.value]}
                        </td>
                    ) : headerData.action ? (
                        <td>
                            {headerData.value === "edit" && (
                                <>
                                    <label htmlFor={`edit-${data.id}`} className="btn btn-xs">
                                        Editer
                                    </label>
                                    <Modal id={`edit-${data.id}`}>
                                        <h3 className="font-bold text-lg">Modifier {data.name}</h3>
                                        <Form
                                            handleSubmit={handleSubmit}
                                            modalId={`edit-${data.id}`}
                                            datas={datas}
                                            edit={true}
                                            {...(data.pictures && {
                                                enctype: "multipart/form-data",
                                            })}
                                        >
                                            {formDatas.map((formData, index) => (
                                                <>
                                                    <Input
                                                        name={formData.name}
                                                        label={formData.label}
                                                        type={formData?.type || "input"}
                                                        handleChange={
                                                            formData?.type === "file"
                                                                ? (e) =>
                                                                      setDatas({
                                                                          ...datas,
                                                                          files: e.target.files,
                                                                      })
                                                                : (e) =>
                                                                      handleChange(e, formData.integer === true && true)
                                                        }
                                                        {...(formData.type !== "file" && {
                                                            value: datas[formData.name],
                                                        })}
                                                        {...(formData.multiple === true && {
                                                            multiple: true,
                                                        })}
                                                        error={errors[formData.name]}
                                                        {...(formData.type === "select" && {
                                                            options: formData.options,
                                                            optionLabel: formData.optionLabel,
                                                        })}
                                                        key={index}
                                                    />
                                                    {formData.type === "file" && (
                                                        <div className="flex space-x-1">
                                                            {data.pictures.map((pic) => (
                                                                <Image
                                                                    src={pic.url}
                                                                    width={75}
                                                                    height={75}
                                                                    alt={pic.url}
                                                                    className="rounded-lg"
                                                                    key={pic.url}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            ))}
                                        </Form>
                                    </Modal>
                                </>
                            )}
                            {headerData.value === "details" && (
                                <div>
                                    <label htmlFor={`details-${data.id}`} className="btn btn-xs">
                                        Détails
                                    </label>
                                    <Modal id={`details-${data.id}`}>
                                        <h3 className="font-bold text-lg mb-3">Détails {data.id}</h3>
                                        <table className="table table-zebra">
                                            <tbody>
                                                {detailsDatas.map((detailsData, index) => (
                                                    <tr key={index}>
                                                        <th>{detailsData.label}</th>
                                                        <td>
                                                            {data[detailsData.value] instanceof Array ? (
                                                                <ul className="list-disc">
                                                                    {data[detailsData.value].map((item, index) => (
                                                                        <li key={index}>
                                                                            {detailsData[detailsData.value].map(
                                                                                (subItem, index) => (
                                                                                    <span key={index}>
                                                                                        {subItem === "price"
                                                                                            ? formatPrice(item[subItem])
                                                                                            : item[subItem]}{" "}
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                DisplayNestedProperties(
                                                                    data,
                                                                    detailsData.value,
                                                                    detailsData.format
                                                                )
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </Modal>
                                </div>
                            )}
                            {headerData.value === "delete" && (
                                <div>
                                    <label htmlFor={`delete-${data.id}`} className="btn btn-error btn-xs">
                                        Supprimer
                                    </label>
                                    <Modal id={`delete-${data.id}`}>
                                        <h3 className="font-bold text-lg">Supprimer {data.name}</h3>
                                        <p className="py-4 text-center">
                                            Etes vous sûr de vouloir supprimer <b>{data.name}</b> ?
                                        </p>
                                        <div className=" flex flex-col items-center">
                                            <button
                                                className="btn btn-error btn-sm"
                                                onClick={() =>
                                                    headerData.action(parseInt(data.id), closeModalRef.current)
                                                }
                                            >
                                                Supprimer
                                            </button>
                                            <label
                                                htmlFor={`delete-${data.id}`}
                                                ref={closeModalRef}
                                                className="btn btn-sm hidden"
                                            >
                                                Close modal
                                            </label>
                                        </div>
                                    </Modal>
                                </div>
                            )}
                        </td>
                    ) : (
                        <td>{data[headerData.value]}</td>
                    )}
                </React.Fragment>
            ))}
        </tr>
    )
}
