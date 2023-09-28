import React from "react"
import CartContainer from "@/components/checkout/CartContainer"
import { authOptions } from "@/app/lib/auth"
import { getServerSession } from "next-auth"

export default async function CartPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="cart">
            <CartContainer user={session?.user}/>
        </div>
    )
}
