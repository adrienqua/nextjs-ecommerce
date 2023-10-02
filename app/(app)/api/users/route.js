import { prisma } from "@/app/lib/prisma"
import { userSchema } from "@/prisma/validation"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    })

    return NextResponse.json(users)
}

export async function POST(req) {
    let validation
    try {
        const body = await req.json()
        validation = userSchema.parse({
            email: body.email,
            password: body.password,
            name: body.name,
        })
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
    //api
    const user = await prisma.user.create({
        data: {
            email: validation.email,
            password: await hash(validation.password, 12),
            name: validation.name,
        },
    })
    console.log(user)

    return NextResponse.json(user)
}
