import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { productSchema } from "@/prisma/validation"

import { mkdir, writeFile } from "fs/promises"

export async function POST(req) {
    const formData = await req.formData()
    const name = formData.get("name")
    const email = JSON.parse(formData.get("email"))
    const files = formData.getAll("files")

    const path = `./public/uploads/img/products/`
    await mkdir(path, { recursive: true })

    for (const file of files) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${file.name}_${Date.now()}`
        await writeFile(`${path}${fileName}`, buffer)
    }

    return NextResponse.json({ name, email })
}
