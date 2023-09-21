import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { productSchema } from "@/prisma/validation"

export async function GET(req, context) {
    //const maxPrice = parseFloat(context.searchParams.priceMax)
    const searchParams = req.nextUrl.searchParams
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    const categories = searchParams
        .get("categories")
        ?.split(",")
        .map((x) => Number(x))

    const colors = searchParams
        .get("colors")
        ?.split(",")
        .map((x) => Number(x))

    const sizes = searchParams
        .get("sizes")
        ?.split(",")
        .map((x) => Number(x))

    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        price: {
                            gte: minPrice ? minPrice : undefined,
                            lte: maxPrice ? maxPrice : undefined,
                        },
                        categoryId: {
                            in: categories ? categories : undefined,
                        },
                        productVariants: {
                            some:
                                colors || sizes
                                    ? {
                                          colorId: {
                                              in: colors ? colors : undefined,
                                          },
                                          sizeId: {
                                              in: sizes ? sizes : undefined,
                                          },
                                      }
                                    : undefined,
                        },
                    },
                ],
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
                productVariants: {
                    select: {
                        colorId: true,
                        sizeId: true,
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