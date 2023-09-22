import { prisma } from "@/app/lib/prisma"
import { userSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        const validation = userSchema.parse({
            email: body.email,
            password: body.password,
            name: body.name,
        })

        const user = await prisma.user.create({
            data: {
                email: validation.email,
                password: await hash(validation.password, 12),
                name: validation.name,
            },
        })
        console.log(user)

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}
