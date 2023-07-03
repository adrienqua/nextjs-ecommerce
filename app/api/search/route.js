import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req) {
    const url = new URL(req.url)
    const query = url.searchParams.get("q")

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
    })
    console.log(products)
    return NextResponse.json(products)
}
