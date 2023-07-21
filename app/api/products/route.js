import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import Categories from "./../../categories/page"

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                categoryId: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        })
        console.log(products)
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(req) {
    const body = await req.json()
    const product = await prisma.product.create({ data: body })
    console.log(product)

    return NextResponse.json(product)
}
