import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const products = await prisma.product.findMany({
        take: 4,
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
}
