import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const size = await prisma.size.findUnique({
        where: { id: id },
    })
    return NextResponse.json(size)
}

export async function PUT(req, context) {
    const id = parseInt(context.params.id)
    const body = await req.json()

    const size = await prisma.size.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(size)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const size = await prisma.size.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
