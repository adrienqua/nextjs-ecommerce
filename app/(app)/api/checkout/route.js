import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"
const stripe = require("stripe")(process.env.STRIPE_SK)

export async function POST(req) {
    const { userId, address, carrierName, carrierPrice, products } = await req.json()

    const productsUniqueIds = [...new Set(products)]

    const productsDetails = await prisma.productVariant.findMany({
        where: { id: { in: productsUniqueIds } },
        include: {
            color: true,
            size: true,
            product: true,
        },
    })

    console.log(productsDetails, "dddddddddddddddddd")

    let line_items = []
    let order_items = []
    let subTotal = 0
    for (const product of productsDetails) {
        const quantity = products.filter((id) => id === product.id).length
        const price = product.price * 100

        subTotal += (price * quantity) / 100

        line_items.push({
            quantity: quantity,
            price_data: {
                currency: "EUR",
                product_data: { name: product.product.name },
                unit_amount: price.toFixed(0),
            },
        })
        order_items.push({
            quantity,
            price: product.price,
            product: product.product.name,
            size: product?.size?.name,
            color: product?.color?.name,
        })
    }

    const total = subTotal + carrierPrice

    const order = await prisma.order
        .create({
            data: {
                userId: userId,
                address: address,
                status: "Unpaid",
                carrierName: carrierName,
                carrierPrice: carrierPrice,
                subTotal: parseFloat(subTotal),
                total: total,
                orderItems: {
                    createMany: {
                        data: order_items,
                    },
                },
            },
        })
        .then(async (res) => {
            const updatedOrder = await prisma.order.update({
                where: {
                    id: res.id,
                },
                data: {
                    orderNumber: `A${res.id.toString().padStart(7, 0)}`,
                },
            })

            return updatedOrder
        })

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: subTotal >= 60 ? 0 : (carrierPrice * 100).toFixed(0),
                        currency: "EUR",
                    },
                    display_name: carrierName,
                },
            },
        ],
        mode: "payment",
        customer_email: "777adrien@gmail.com",
        success_url: process.env.PUBLIC_URL + "/checkout/success?orderId=" + order.orderNumber,
        cancel_url: process.env.PUBLIC_URL + "/checkout/canceled?orderId=" + order.orderNumber,
        metadata: { orderId: order.orderNumber },
    })

    console.log("sessssssssssssssssssssssssssssion", session)

    //res.redirect(303, session.url)

    console.log(order_items)
    return NextResponse.json({ url: session.url })
}
