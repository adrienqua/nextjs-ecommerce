import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const color = await prisma.color.findUnique({
        where: { id: id },
    })
    return NextResponse.json(color)
}

export async function PUT(req, context) {
    const id = parseInt(context.params.id)
    const body = await req.json()

    const color = await prisma.color.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(color)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const color = await prisma.color.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
