import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req) {
    const url = new URL(req.url)
    const query = url.searchParams.get("q")

    if (!query) {
        return NextResponse.json([])
    }

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query,
                    },
                },
                {
                    description: {
                        contains: query,
                    },
                },
            ],
        },
        include: {
            pictures: true,
        },
    })
    console.log(products.length, "products searched")
    return NextResponse.json(products)
}
