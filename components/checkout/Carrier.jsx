import React from "react"
import Form from "../Form"
import Input from "../Input"

import Modal from "../Modal"
import { formatPrice } from "@/utils/formatPrice"

export default function Carrier({ carriers, handleCarrierChange }) {
    return (
        <div className="checkout-carrier bg-white rounded-xl px-8 py-6 shadow-sm lg:w-1/2">
            <h2 className="h1 mb-5">Livraison</h2>
            <div
                className="form-control"
                onChange={(e) => handleCarrierChange(e)}
            >
                {carriers.map((carrier, index) => (
                    <Input
                        type="radio"
                        name="carrier"
                        id={carrier.id}
                        label={`${carrier.name} ${
                            carrier.description
                        }  ${formatPrice(carrier.price)}`}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}
