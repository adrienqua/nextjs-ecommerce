import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export const revalidate = 0

export async function GET(req, context) {
    const userId = context.params.userId

    try {
        const products = await prisma.product.findMany({
            where: {
                favorites: {
                    some: {
                        userId: userId,
                    },
                },
            },
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
                pictures: {
                    select: {
                        id: true,
                        url: true,
                    },
                },
                ...(userId && {
                    favorites: {
                        where: { userId: userId },
                    },
                }),
            },
        })
        console.log(products.length, "products by categories")
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(error)
    }
}
