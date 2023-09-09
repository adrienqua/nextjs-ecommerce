import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import Categories from "./../../categories/page"
import { productSchema } from "@/prisma/validation"

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
    try {
        const body = await req.json()
        const validation = productSchema.parse(body)

        const product = await prisma.product.create({
            data: {
                name: validation.name,
                description: validation.description,
                price: validation.price,
                categoryId: validation.categoryId,
                productVariants: {
                    createMany: {
                        data: body.productVariants,
                    },
                },
            },
            include: {
                productVariants: true,
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
