import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
    const review = await prisma.review.findUnique({
        where: { id: id },
    })
    return NextResponse.json(review)
}

export async function PUT(req, context) {
    const id = parseInt(context.params.id)
    const body = await req.json()

    const review = await prisma.review.update({
        where: { id: id },
        data: body,
    })
    return NextResponse.json(review)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const review = await prisma.review.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
