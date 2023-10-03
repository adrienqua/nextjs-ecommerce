import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export const revalidate = 0

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get("page"))
    const pageCount = 12
    const userId = searchParams.get("userId")
    const categorySlug = searchParams.get("slug")

    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    slug: categorySlug,
                },
            },
            skip: page ? page * pageCount - pageCount : undefined,
            take: pageCount,
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
