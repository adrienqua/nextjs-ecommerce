import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const email = context.params.email
    const user = await prisma.user.findUnique({
        where: { email: email },
    })
    return NextResponse.json(user)
}
