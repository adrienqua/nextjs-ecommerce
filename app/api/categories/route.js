import { prisma } from "@/app/lib/prisma"
import { categorySchema } from "@/prisma/validation"
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
    try {
        const body = await req.json()
        const validation = categorySchema.parse(body)

        const category = await prisma.category.create({ data: validation })
        console.log(category)

        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
