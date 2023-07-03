import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
        },
    })
    console.log(products)
    return NextResponse.json(products)
}

export async function POST(req) {
    const body = await req.json()
    const product = await prisma.product.create({ data: body })
    console.log(product)

    return NextResponse.json(product)
}
