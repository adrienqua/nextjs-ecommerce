import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"
const stripe = require("stripe")(process.env.STRIPE_SK)

export async function POST(req) {
    const { userId, address, carrierName, carrierPrice, products, discountId } = await req.json()

    const productsUniqueIds = [...new Set(products)]

    //refetch data to check integrity
    const productsDetails = await prisma.productVariant.findMany({
        where: { id: { in: productsUniqueIds } },
        include: {
            color: true,
            size: true,
            product: true,
        },
    })

    let discount
    try {
        discount = await prisma.discount.findUnique({
            where: {
                id: discountId,
            },
        })
    } catch (error) {
        console.log(error)
    }

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

    let shipping
    if (subTotal >= 60) {
        shipping = 0
    } else {
        shipping = carrierPrice
    }

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

    console.log(total.toFixed(2), discountAmount, "total and discount")

    const order = await prisma.order
        .create({
            data: {
                userId: userId,
                address: address,
                status: "UNPAID",
                carrierName: carrierName,
                carrierPrice: shipping,
                subTotal: parseFloat(subTotal),
                discount: discountAmount > 0 ? parseFloat(subTotal) - total.toFixed(2) - shipping : 0,
                total: total.toFixed(2),
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

    //create stripe coupon
    let coupon
    if (discountAmount > 0) {
        coupon = await stripe.coupons.create({
            ...(discount.isPercent && {
                percent_off: discountAmount,
            }),
            ...(!discount.isPercent && {
                amount_off: discountAmount * 100,
            }),
            currency: "eur",
            duration: "once",
            name: discount.code,
        })
    }

    //create stripe session
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
        discounts:
            discountAmount > 0
                ? [
                      {
                          coupon: coupon.id,
                      },
                  ]
                : undefined,
        customer_email: "777adrien@gmail.com",
        success_url: `${process.env.PUBLIC_URL}/checkout/success?orderId=${order.orderNumber}&sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.PUBLIC_URL + "/checkout/canceled?orderId=" + order.orderNumber,
        metadata: { orderId: order.orderNumber },
    })

    //res.redirect(303, session.url)

    console.log(order_items)
    return NextResponse.json({ url: session.url })
}
