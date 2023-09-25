import React, { useEffect, useRef, useState } from "react"
import Modal from "../Modal"
import Input from "../Input"
import Form from "../Form"
import { deleteAddress, editAddress } from "@/app/services/addressAPI"
import { formatErrors } from "@/utils/formatErrors"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AccountAddressesItem({ address }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState({})

    const router = useRouter()
    const closeModalRef = useRef(null)

    const handleSubmit = async (datas, id, closeModal) => {
        try {
            await editAddress(id, {
                label: datas.label,
                name: datas.name,
                phone: datas.phone,
                address: datas.address,
                postalCode: datas.postalCode,
                city: datas.city,
                country: datas.country,
            })
            setErrors([])
            closeModal.click()
            toast.success("Adresse modifiée !")
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteAddress(id)
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseFloat(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    useEffect(() => {
        setDatas(address)
    }, [])

    return (
        <>
            <div className="card border border-base-200">
                <div className="card-body">
                    <div className="flex justify-between">
                        <h2 className="card-title">{address?.label}</h2>
                        <div className="dropdown dropdown-end flex ">
                        <label tabIndex={0} className="btn btn-ghost btn-xs">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <label htmlFor={`edit-address-${address.id}`}>Editer</label>
                            </li>
                            <li>
                                <label htmlFor={`delete-address-${address.id}`}>Supprimer</label>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <p>
                        {address?.name} <br />
                        {address?.address} <br /> {address?.postalCode} {address?.city} <br />
                        {address?.country}
                    </p>
                </div>
            </div>
            <Modal id={`edit-address-${address.id}`}>
                <Form handleSubmit={handleSubmit} modalId={`edit-address-${address.id}`} datas={datas} edit={true}>
                    <Input
                        name="label"
                        label="Titre"
                        value={datas.label}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input
                        name="name"
                        label="Nom complet"
                        value={datas.name}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input
                        name="phone"
                        label="Téléphone"
                        value={datas.phone}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input
                        name="address"
                        label="Adresse"
                        value={datas.address}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input
                        name="postalCode"
                        label="Code postal"
                        value={datas.postalCode}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input
                        name="city"
                        label="Ville"
                        value={datas.city}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input
                        name="country"
                        label="Pays"
                        value={datas.country}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                </Form>
            </Modal>

            <Modal id={`delete-address-${address.id}`}>
                <h3 className="font-bold text-lg">Supprimer le commentaire</h3>
                <p className="py-4 text-center">Etes vous sûr de vouloir supprimer ce commentaire ?</p>
                <div className=" flex flex-col items-center">
                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(address.id, closeModalRef.current)}
                    >
                        Supprimer
                    </button>
                    <label htmlFor={`delete-address${address.id}`} ref={closeModalRef} className="btn btn-sm hidden">
                        Close modal
                    </label>
                </div>
            </Modal>
        </>
    )
}
