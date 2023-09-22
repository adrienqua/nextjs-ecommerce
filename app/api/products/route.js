import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import Categories from "./../../categories/page"
import { productSchema } from "@/prisma/validation"

import { mkdir, writeFile } from "fs/promises"

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get("page"))
    const pageCount = 12

    console.log(page)
    try {
        const products = await prisma.product.findMany({
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
        const formData = await req.formData()
        const validation = productSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseInt(formData.get("price")),
            categoryId: parseInt(formData.get("categoryId")),
        })

        let productVariants = JSON.parse(formData.get("productVariants"))

        //Setup files
        const files = formData.getAll("files")
        console.log(files)

        const path = `./public/uploads/img/products/`
        await mkdir(path, { recursive: true })

        const imgArray = []
        for (const file of files) {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const fileName = `${Date.now()}_${file.name}`
            await writeFile(`${path}${fileName}`, buffer)

            imgArray.push({
                url: `/uploads/img/products/${fileName}`,
            })
        }

        //Api
        const product = await prisma.product.create({
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
                    createMany: {
                        data: productVariants,
                    },
                },
            },
            include: {
                pictures: true,
                productVariants: true,
            },
        })

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

/* export async function POST(req) {
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
} */
