"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React from "react"

export default function CheckoutSuccess() {
    const params = useSearchParams()
    const orderId = params.get("orderId")
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
