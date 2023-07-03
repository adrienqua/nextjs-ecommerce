import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req) {
    const body = await req.json()
    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: await hash(body.password, 12),
            name: body.name,
        },
    })
    console.log(user)

    return NextResponse.json(user)
}
