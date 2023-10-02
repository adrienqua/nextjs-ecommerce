import React, { useState } from "react"
import Input from "../Input"
import { getDiscount } from "@/app/services/discountAPI"

export default function CheckoutDiscount({ setDiscount }) {
    const [discountData, setDiscountData] = useState("")
    const [isDiscount, setIsDiscount] = useState(false)

    const handleSubmitDiscount = async (e) => {
        e.preventDefault()
        await getDiscount(discountData).then((res) => {
            if (res.data !== null) {
                setDiscount(res.data)
                setIsDiscount(true)
            } else {
                setIsDiscount(false)
            }
        })
    }

    return (
        <div className="cart-order bg-white rounded-xl px-8 py-6 shadow-sm mb-5">
            <form method="POST" onSubmit={handleSubmitDiscount}>
                <Input
                    label="Code promo"
                    name="discount"
                    outerLabel={false}
                    className="!mb-0 !w-full"
                    handleChange={(e) => setDiscountData(e.target.value.toUpperCase())}
                    value={discountData}
                    success={isDiscount ? true : false}
                />
                <input type="submit" hidden />
            </form>
        </div>
    )
}
