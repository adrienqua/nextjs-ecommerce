import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const favorite = await prisma.favorite.findUnique({
        where: { id: id },
    })
    return NextResponse.json(favorite)
}

export async function PUT(req, context) {
    const id = parseInt(context.params.id)
    const body = await req.json()

    const favorite = await prisma.favorite.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(favorite)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const favorite = await prisma.favorite.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
