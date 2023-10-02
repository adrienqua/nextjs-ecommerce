import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"
const stripe = require("stripe")(process.env.STRIPE_SK)

export async function POST(req) {
    const { orderId, sessionId } = await req.json()

    const retrievedSession = await stripe.checkout.sessions.retrieve(sessionId)
    console.log(retrievedSession)

    let order
    if (retrievedSession.payment_status === "paid") {
        order = await prisma.order.update({
            where: {
                orderNumber: orderId,
            },
            data: {
                status: "PAID",
            },
        })
    }

    // Don't even need, could be useful tho.
    /* const paymentIntent = await stripe.paymentIntents.retrieve(retrievedSession.payment_intent)
    console.log(paymentIntent) */

    if (order.status === "PAID") {
        return NextResponse.json({orderStatus: "PAID"})
    } else {

        return NextResponse.json(null)
    }

}
