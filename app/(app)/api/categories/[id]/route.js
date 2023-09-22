import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const category = await prisma.category.findUnique({
        where: { id: id },
    })
    return NextResponse.json(category)
}

export async function PUT(req, context) {
    const id = parseInt(context.params.id)
    const body = await req.json()

    const category = await prisma.category.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(category)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const category = await prisma.category.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
