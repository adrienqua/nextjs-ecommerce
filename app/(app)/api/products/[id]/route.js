import { prisma } from "@/app/lib/prisma"
import { productSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import cuid from "cuid"
import { mkdir, writeFile } from "fs/promises"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)

    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get("userId")

    const product = await prisma.product.findUnique({
        where: { id: id },
        include: {
            pictures: true,
            productVariants: {
                include: {
                    color: true,
                    size: true,
                },
            },
            specifications: true,
            ...(userId && {
                favorites: {
                    where: { userId: userId },
                },
            }),
            reviews: {
                orderBy: {
                    id: "desc",
                },
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    })

    //calculate average rating
    const TotalRatings = product.reviews.reduce((a, b) => a + b.rating, 0)
    const averageRating = (TotalRatings / product.reviews.length).toFixed(1)
    product.averageRating = averageRating
    product.ratingCount = product.reviews.length

    return NextResponse.json(product)
}

export async function PUT(req, context) {
    let validation
    const id = parseInt(context.params.id)
    const imgArray = []
    const formData = await req.formData()
    let productVariants = JSON.parse(formData.get("productVariants"))
    let specifications = JSON.parse(formData.get("specifications"))

    //validation
    try {
        validation = productSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            categoryId: parseInt(formData.get("categoryId")),
        })

        //Setup files
        const files = formData.getAll("files")

        const path = `./public/uploads/img/products/`
        await mkdir(path, { recursive: true })

        for (const file of files) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const fileName = `${Date.now()}_${file.name}`
            await writeFile(`${path}${fileName}`, buffer)

            imgArray.push({
                url: `/uploads/img/products/${fileName}`,
            })
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }

    //Api
    const product = await prisma.product.update({
        where: { id: id },
        data: {
            name: validation.name,
            description: validation.description,
            price: validation.price,
            categoryId: validation.categoryId,
            pictures: {
                createMany: {
                    data: imgArray,
                },
            },
            productVariants: {
                deleteMany: {
                    NOT: {
                        id: {
                            in: productVariants
                                .map((variant) => variant.id)
                                .filter((variant) => typeof variant === "string"),
                        },
                    },
                },
                upsert: productVariants.map((variant) => ({
                    create: variant,
                    update: variant,
                    where: {
                        id: variant.id || cuid(),
                    },
                })),
            },
            specifications: {
                deleteMany: {
                    NOT: {
                        id: {
                            in: specifications.map((spec) => spec.id).filter((spec) => typeof spec === "string"),
                        },
                    },
                },
                upsert: specifications.map((spec) => ({
                    create: spec,
                    update: spec,
                    where: {
                        id: spec.id || cuid(),
                    },
                })),
            },
        },
        include: {
            pictures: true,
            specifications: true,
            productVariants: true,
        },
    })

    console.log(product)
    return NextResponse.json(product)
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const product = await prisma.product.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
