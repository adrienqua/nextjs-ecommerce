import React, { useEffect, useState } from "react"
import Form from "../Form"
import Input from "../Input"
import { newAddress } from "@/app/services/addressAPI"
import { useSession } from "next-auth/react"
import Modal from "../Modal"
import { getUserAddresses } from "@/app/services/userAPI"

export default function Address() {
    const [datas, setDatas] = useState({
        label: "Maison",
        country: "France",
    })
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState({})
    const { data: session } = useSession()

    const handleSubmit = async (datas) => {
        await newAddress({
            label: datas.label,
            name: datas.name,
            phone: datas.phone,
            address: datas.address,
            postalCode: datas.postalCode,
            city: datas.city,
            country: datas.country,
            userId: session.user.id,
        })
        fetchAddresses()
    }

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleSelectChange = (e) => {
        let id = parseInt(e.target.value)
        const cloneAddresses = [...addresses]
        const [result] = cloneAddresses.filter((address) => address.id === id)
        setSelectedAddress(result)
    }

    const fetchAddresses = async () => {
        setAddresses(await getUserAddresses(session.user.id))
    }

    useEffect(() => {
        session && fetchAddresses()
    }, [session])

    return (
        <div className="checkout-address bg-white rounded-xl px-8 py-6 shadow-sm lg:w-1/2">
            <div className="flex justify-between">
                <h2 className="h1 mb-5">Adresse</h2>
                <label
                    htmlFor="new-address-form"
                    className="btn btn-primary btn-sm"
                >
                    Ajouter une adresse
                </label>
            </div>

            {addresses.length === 0 && (
                <p>Vous n&apos;avez pas d&apos;adresse</p>
            )}

            <Modal id="new-address-form">
                <Form
                    handleSubmit={handleSubmit}
                    modalId="new-address-form"
                    datas={datas}
                >
                    <h3 className="h1">Ajouter une adresse</h3>
                    <Input
                        name="label"
                        label="Titre"
                        value={datas.label}
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="name"
                        label="Nom complet"
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="phone"
                        label="Téléphone"
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="address"
                        label="Adresse"
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="postalCode"
                        label="Code postal"
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="city"
                        label="Ville"
                        handleChange={(e) => handleChange(e)}
                    />
                    <Input
                        name="country"
                        label="Pays"
                        handleChange={(e) => handleChange(e)}
                        value={datas.country}
                    />
                </Form>
            </Modal>

            {addresses.length > 0 && (
                <>
                    <Input
                        name="address"
                        type="select"
                        label="Sélectionner une adresse"
                        options={addresses}
                        optionLabel="label"
                        handleChange={(e) => handleSelectChange(e)}
                    />
                    <p>{selectedAddress?.name}</p>
                    <p>
                        {selectedAddress?.address} <br />{" "}
                        {selectedAddress?.postalCode} {selectedAddress?.city}{" "}
                        <br />
                        {selectedAddress?.country}
                    </p>
                </>
            )}
        </div>
    )
}
