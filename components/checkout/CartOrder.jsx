import React from "react"
import { formatPrice } from "@/utils/formatPrice"

export default function CartOrder({
    children,
    subTotal,
    shipping,
    handleOrder,
    discount,
    isOrderFilled,
    cart = false,
}) {
    let total
    let discountAmount
    //calc total with discounts
    if (discount && subTotal + shipping >= discount.minCartPrice) {
        discountAmount = discount.amount
        if (discount.isPercent) {
            total = (subTotal + shipping) * ((100 - discountAmount) / 100)
        } else {
            total = subTotal + shipping - discountAmount
        }
    } else {
        discountAmount = 0
        total = subTotal + shipping
    }

    return (
        <div className="cart-order bg-white rounded-xl px-8 py-6 shadow-sm mb-5">
            <h2 className="h1 mb-5">Ma commande</h2>
            <div className="cart-details flex flex-col mb-5 font-medium">
                <div className="cart-subtotal flex justify-between">
                    <span>Sous total</span>
                    <span className="font-semibold">{formatPrice(subTotal)}</span>
                </div>
                {!cart && (
                    <>
                        {discountAmount > 0 && (
                            <div className="cart-shipping flex justify-between">
                                <span>Code promo</span>
                                <span className="font-semibold">{`${
                                    discount.isPercent ? `- ${discountAmount} %` : `- ${formatPrice(discountAmount)}`
                                }`}</span>
                            </div>
                        )}
                        <div className="cart-shipping flex justify-between">
                            <span>Livraison</span>
                            <span className="font-semibold">{formatPrice(shipping)}</span>
                        </div>
                        <hr className="my-1" />
                        <div className="cart-total flex justify-between">
                            <span>Total</span>
                            <span className="font-bold">{formatPrice(total)}</span>
                        </div>
                    </>
                )}
            </div>

            {cart ? (
                <button className="btn btn-primary btn-md" onClick={() => handleOrder()}>
                    Passer la commande
                </button>
            ) : (
                <button
                    className={`btn btn-primary btn-md ${isOrderFilled ? null : "btn-disabled"}`}
                    onClick={() => handleOrder()}
                >
                    Passer au paiement
                </button>
            )}
        </div>
    )
}
