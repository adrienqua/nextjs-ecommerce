import { prisma } from "@/app/lib/prisma"
import { productSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { mkdir, writeFile } from "fs/promises"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = parseInt(context.params.id)
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
        },
    })
    return NextResponse.json(product)
}

export async function PUT(req, context) {
    try {
        const id = parseInt(context.params.id)
        const formData = await req.formData()
        const validation = productSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            categoryId: parseInt(formData.get("categoryId")),
        })

        //Setup files
        const files = formData.getAll("files")

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
            },
            include: {
                pictures: true,
            },
        })

        console.log(product)
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const product = await prisma.product.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
