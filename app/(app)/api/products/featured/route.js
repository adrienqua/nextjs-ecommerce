import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get("userId")

    const products = await prisma.product.findMany({
        take: 4,
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            categoryId: true,
            pictures: {
                select: {
                    id: true,
                    url: true,
                },
            },
            category: {
                select: {
                    name: true,
                },
            },
            ...(userId && {
                favorites: {
                    where: { userId: userId },
                },
            }),
        },
    })
    console.log(products.length, "products featured")
    return NextResponse.json(products)
}
