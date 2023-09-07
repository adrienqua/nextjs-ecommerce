import { prisma } from "@/app/lib/prisma"
import { productSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const product = await prisma.product.findUnique({
        where: { id: id },
    })
    return NextResponse.json(product)
}

export async function PUT(req, context) {
    try {
        const id = parseInt(context.params.id)
        const body = await req.json()
        const validation = productSchema.parse(body)

        const product = await prisma.product.update({
            where: { id: id },
            data: validation,
        })
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const product = await prisma.product.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
