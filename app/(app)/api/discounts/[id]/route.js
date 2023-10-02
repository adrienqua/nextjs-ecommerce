import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = context.params.id
    const discount = await prisma.discount.findUnique({
        where: { code: id, isActive: true },
    })
    return NextResponse.json(discount)
}

export async function PUT(req, context) {
    const id = context.params.id
    const body = await req.json()

    const discount = await prisma.discount.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(discount)
}

export async function DELETE(req, context) {
    const id = context.params.id

    const discount = await prisma.discount.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
