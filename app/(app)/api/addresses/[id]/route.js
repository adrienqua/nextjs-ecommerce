import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const address = await prisma.address.findUnique({
        where: { id: id },
    })
    return NextResponse.json(address)
}

export async function PUT(req, context) {
    const id = parseInt(context.params.id)
    const body = await req.json()

    const address = await prisma.address.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(address)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const address = await prisma.address.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
