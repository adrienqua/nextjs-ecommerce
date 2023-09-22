import { prisma } from "@/app/lib/prisma"
import { productVariantSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const productVariants = await prisma.productVariant.findMany()
    return NextResponse.json(productVariants)
}

export async function POST(req) {
    try {
        const body = await req.json()
        //const validation = productVariantSchema.parse(body)

        const productVariant = await prisma.productVariant.createMany({ data: body })
        console.log(productVariant)

        return NextResponse.json(productVariant)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
