import { prisma } from "@/app/lib/prisma"
import { reviewSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const reviews = await prisma.review.findMany()
    return NextResponse.json(reviews)
}

export async function POST(req) {
    let validation
    try {
        const body = await req.json()
        validation = reviewSchema.parse(body)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }

    const review = await prisma.review.create({ data: validation })
    console.log(review)

    return NextResponse.json(review)
}
