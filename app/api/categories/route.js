import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        },
    })
    return NextResponse.json(categories)
}

export async function POST(req) {
    const body = await req.json()
    const category = await prisma.category.create({ data: body })
    console.log(category)

    return NextResponse.json(category)
}
