"use client"
import React, { useEffect, useState } from "react"

import AccountAddressesItem from "./AccountAddressesItem"
import Modal from "../Modal"
import Form from "../Form"
import Input from "../Input"
import { newAddress } from "@/app/services/addressAPI"
import { useRouter } from "next/navigation"
import { formatErrors } from "@/utils/formatErrors"
import { toast } from "react-toastify"

export default function AccountAddresses({ addresses, userId }) {
    const [datas, setDatas] = useState([])
    const [newAddressDatas, setNewAddressDatas] = useState({})
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const handleNewSubmit = async (datas, closeModal) => {
        try {
            await newAddress({
                label: datas.label,
                name: datas.name,
                phone: datas.phone,
                address: datas.address,
                postalCode: datas.postalCode,
                city: datas.city,
                country: datas.country,
                userId: userId,
            })
            setErrors([])
            closeModal.click()
            toast.success("Adresse créée !")
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
        setNewAddressDatas({ ...newAddressDatas, [e.target.name]: value })
    }

    useEffect(() => {
        setDatas(addresses)
    }, [])

    return (
        <>
            <div id="account-addresses" className="flex-1 md:mx-5 bg-white p-5 shadow-sm rounded-2xl">
                <div className="flex justify-between px-2 mb-3">
                    <h2 className="h2 ">Mes adresses</h2>
                    <label htmlFor={`new-address`} className="btn btn-sm btn-primary">
                        Nouvelle adresse
                    </label>
                    <Modal id={`new-address`}>
                        <Form handleSubmit={handleNewSubmit} modalId={`new-address`} datas={newAddressDatas}>
                            <Input
                                name="label"
                                label="Titre"
                                handleChange={(e) => handleChange(e)}
                                required="required"
                            />
                            <Input
                                name="name"
                                label="Nom complet"
                                handleChange={(e) => handleChange(e)}
                                required="required"
                            />
                            <Input
                                name="phone"
                                label="Téléphone"
                                handleChange={(e) => handleChange(e)}
                                required="required"
                            />
                            <Input
                                name="address"
                                label="Adresse"
                                handleChange={(e) => handleChange(e)}
                                required="required"
                            />
                            <Input
                                name="postalCode"
                                label="Code postal"
                                handleChange={(e) => handleChange(e)}
                                required="required"
                            />
                            <Input
                                name="city"
                                label="Ville"
                                handleChange={(e) => handleChange(e)}
                                required="required"
                            />
                            <Input
                                name="country"
                                label="Pays"
                                handleChange={(e) => handleChange(e)}
                                required="required"
                            />
                        </Form>
                    </Modal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {addresses.length > 0 ? (
                        addresses.map((address, index) => <AccountAddressesItem key={index} address={address} />)
                    ) : (
                        <p className="text-gray-500">Vous n&apos;avez pas enregistré d&apos;adresses</p>
                    )}
                </div>
            </div>
        </>
    )
}
