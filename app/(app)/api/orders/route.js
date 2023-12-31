import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const orders = await prisma.order.findMany({
        orderBy: [
            {
                id: "desc",
            },
        ],
        include: {
            orderItems: true,
            user: true,
        },
    })
    console.log(orders)
    return NextResponse.json(orders)
}

export async function POST(req) {
    const body = await req.json()
    const order = await prisma.order.create({
        data: {
            orderNumber: body.orderNumber,
            address: body.address,
            userId: body.userId,
            status: body.status,
            carrierName: body.carrierName,
            carrierPrice: body.carrierPrice,
            orderItems: {
                createMany: {
                    data: body.orderItems,
                },
            },
        },
    })

    return NextResponse.json(order)
}
