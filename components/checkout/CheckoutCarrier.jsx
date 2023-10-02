import React from "react"
import Form from "../Form"
import Input from "../Input"

import Modal from "../Modal"
import { formatPrice } from "@/utils/formatPrice"

export default function CheckoutCarrier({ carriers, handleCarrierChange }) {
    return (
        <div className="checkout-carrier bg-white rounded-xl px-8 py-6 shadow-sm w-full mb-5">
            <h2 className="h1 mb-5">Livraison</h2>
            <div className="form-control font-medium" onChange={(e) => handleCarrierChange(e)}>
                {carriers.map((carrier, index) => (
                    <label className="label cursor-pointer" key={index}>
                        <input
                            type="radio"
                            name="carrier"
                            className="radio radio-sm checked:bg-primary"
                            id={carrier.id}
                        />
                        <div className="flex flex-col text-right">
                            <span className="label-text font-semibold">{`${carrier.name}`}</span>
                            <span className="label-text font-medium text-gray-500">{`${
                                carrier.description
                            }  ${formatPrice(carrier.price)}`}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    )
}
