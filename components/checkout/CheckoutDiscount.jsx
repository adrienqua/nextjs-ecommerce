import React, { useState } from "react"
import Input from "../Input"
import { getDiscount } from "@/app/services/discountAPI"

export default function CheckoutDiscount({ setDiscount }) {
    const [discountData, setDiscountData] = useState("")
    const [isDiscount, setIsDiscount] = useState()
    const [error, setError] = useState()

    const handleSubmitDiscount = async (e) => {
        e.preventDefault()
        if (discountData !== "") {
            await getDiscount(discountData).then((res) => {
                if (res.data !== null) {
                    setError(null)
                    setDiscount(res.data)
                    setIsDiscount(true)
                } else {
                    setIsDiscount(false)
                    setError("Le code promo n'est pas valide.")
                }
            })
        }
    }

    return (
        <div className="cart-order bg-white rounded-xl px-8 py-6 shadow-sm mb-5">
            <form method="POST" onSubmit={handleSubmitDiscount}>
                <div className="flex space-x-1">
                    <Input
                        label="Code promo"
                        name="discount"
                        outerLabel={false}
                        className="!mb-0"
                        handleChange={(e) => setDiscountData(e.target.value.toUpperCase())}
                        value={discountData}
                        success={isDiscount ? true : false}
                        error={error ? "Le code promo n'est pas valide." : null}
                    />
                    <button type="submit" className="btn join-item rounded-xl">
                        Appliquer
                    </button>
                </div>
                {/* <input type="submit" hidden /> */}
            </form>
        </div>
    )
}
