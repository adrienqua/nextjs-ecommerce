import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const order = await prisma.order.findUnique({
        where: { id: id },
    })
    return NextResponse.json(order)
}

export async function PUT(req, context) {
    const id = parseInt(context.params.id)
    const body = await req.json()

    const order = await prisma.order.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(order)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const order = await prisma.order.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
