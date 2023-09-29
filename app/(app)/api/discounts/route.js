import { prisma } from "@/app/lib/prisma"
import { discountSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const discounts = await prisma.discount.findMany()
    return NextResponse.json(discounts)
}

export async function POST(req) {
    try {
        const body = await req.json()
        const validation = discountSchema.parse(body)

        const discount = await prisma.discount.create({ data: validation })
        console.log(discount)

        return NextResponse.json(discount)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
