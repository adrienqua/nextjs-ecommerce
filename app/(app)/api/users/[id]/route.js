import { prisma } from "@/app/lib/prisma"
import { userSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = context.params.id
    const user = await prisma.user.findUnique({
        where: { email: id },
        select: {
            id: true,
            email: true,
            name: true,
            addresses: true,
            orders: {
                orderBy: [
                    {
                        id: "desc",
                    },
                ],
                select: {
                    id: true,
                    orderNumber: true,
                    status: true,
                    address: true,
                    user: true,
                    carrierName: true,
                    carrierPrice: true,
                    createdAt: true,
                    subTotal: true,
                    discount: true,
                    total: true,
                    orderItems: true,
                },
            },
        },
    })
    return NextResponse.json(user)
}

export async function PUT(req, context) {
    try {
        const id = context.params.id
        const body = await req.json()
        const validation = userSchema.parse(body)

        const user = await prisma.user.update({
            where: { id: id },
            data: {
                email: validation.email,
                password: await hash(validation.password, 12),
                name: validation.name,
            },
        })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
