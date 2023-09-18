import React, { useEffect, useState } from "react"
import Modal from "../Modal"
import Input from "../Input"
import Form from "../Form"
import { editAddress } from "@/app/services/addressAPI"
import { formatErrors } from "@/utils/formatErrors"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function AccountAddressesItem({ address }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const handleSubmit = async (id, datas, closeModal) => {
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
                        <label
                            htmlFor={`edit-address-${address.id}`}
                            className="btn btn-sm"
                        >
                            Editer
                        </label>
                    </div>
                    <p>
                        {address?.name} <br />
                        {address?.address} <br /> {address?.postalCode}{" "}
                        {address?.city} <br />
                        {address?.country}
                    </p>
                </div>
            </div>
            <Modal id={`edit-address-${address.id}`}>
                <Form
                    handleSubmit={handleSubmit}
                    modalId={`edit-address-${address.id}`}
                    datas={datas}
                    edit={true}
                >
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
        </>
    )
}
