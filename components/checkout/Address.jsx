import React from "react"
import Form from "../Form"
import Input from "../Input"

import Modal from "../Modal"

export default function Address({
    datas,
    addresses,
    selectedAddress,
    handleChange,
    handleAddressChange,
    handleSubmit,
}) {
    return (
        <div className="checkout-address bg-white rounded-xl px-8 py-6 shadow-sm lg:w-1/2 mb-5">
            <div className="flex justify-between">
                <h2 className="h1 mb-5">Adresse</h2>
                <label htmlFor="new-address-form" className="btn btn-primary btn-sm">
                    Ajouter une adresse
                </label>
            </div>

            {addresses.length === 0 && <p>Vous n&apos;avez pas d&apos;adresse</p>}

            <Modal id="new-address-form">
                <Form handleSubmit={handleSubmit} modalId="new-address-form" datas={datas}>
                    <h3 className="h1">Ajouter une adresse</h3>
                    <Input
                        name="label"
                        label="Titre"
                        value={datas.label}
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input name="name" label="Nom complet" handleChange={(e) => handleChange(e)} required="required" />
                    <Input name="phone" label="Téléphone" handleChange={(e) => handleChange(e)} required="required" />
                    <Input name="address" label="Adresse" handleChange={(e) => handleChange(e)} required="required" />
                    <Input
                        name="postalCode"
                        label="Code postal"
                        handleChange={(e) => handleChange(e)}
                        required="required"
                    />
                    <Input name="city" label="Ville" handleChange={(e) => handleChange(e)} required="required" />
                    <Input
                        name="country"
                        label="Pays"
                        handleChange={(e) => handleChange(e)}
                        required="required"
                        value={datas.country}
                    />
                </Form>
            </Modal>

            {addresses.length > 0 && (
                <>
                    <div className="form-control font-medium mb-2" onChange={(e) => handleAddressChange(e)}>
                        {addresses.map((address, index) => (
                            <Input type="radio" name="address" id={address.id} label={address.label} key={index} />
                        ))}
                    </div>
                    <p>{selectedAddress?.name}</p>
                    <p>
                        {selectedAddress?.address} <br /> {selectedAddress?.postalCode} {selectedAddress?.city} <br />
                        {selectedAddress?.country}
                    </p>
                </>
            )}
        </div>
    )
}
