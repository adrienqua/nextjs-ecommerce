"use client"
import React, { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { orderSuccess } from "@/app/services/checkoutAPI"
import { useCartContext } from "@/components/contexts/CartContext"

export default function CheckoutSuccess() {
    const params = useSearchParams()
    const orderId = params.get("orderId")
    const sessionId = params.get("sessionId")

    const { handleEmptyCart } = useCartContext()

    const handleSuccess = async () => {
        await orderSuccess({
            orderId: orderId,
            sessionId: sessionId,
        }).then((res) => {
            if (res.data?.orderStatus === "PAID" && res.data !== null) {
                handleEmptyCart()
            }
        })
    }

    useEffect(() => {
        if (sessionId) {
            handleSuccess()
        }
    }, [sessionId])

    return (
        <div className="text-center">
            <div className="bg-success shadow-sm rounded-xl p-5 mb-5">
                Votre commande {orderId} a bien été effectuée !
            </div>

            <Link href="/account" className="btn">
                Voir les détails sur mon compte
            </Link>
        </div>
    )
}
