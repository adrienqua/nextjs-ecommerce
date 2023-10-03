import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

/* export async function POST(req, context) {
    const body = await req.json()

    const product = await prisma.product.findMany({
        where: { id: { in: body.idArray } },
    })
    return NextResponse.json(product)
} */

export async function POST(req, context) {
    const body = await req.json()

    const product = await prisma.productVariant.findMany({
        where: { id: { in: body.idArray } },
        include: {
            color: true,
            size: true,
            product: {
                include: {
                    pictures: {
                        select: {
                            url: true,
                            colorId: true,
                        },
                    },
                },
            },
        },
    })
    return NextResponse.json(product)
}
