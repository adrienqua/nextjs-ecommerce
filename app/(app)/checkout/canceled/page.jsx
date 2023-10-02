import React from "react"
import Link from "next/link"

export default function CheckoutCanceled() {
    return (
        <div className="text-center">
            <div className="bg-error shadow-sm rounded-xl p-5 mb-5">
                Echec de la commande, veuillez vérifier votre moyen de paiement.
            </div>

            <Link href="/cart" className="btn">
                Retour au panier
            </Link>
        </div>
    )
}
