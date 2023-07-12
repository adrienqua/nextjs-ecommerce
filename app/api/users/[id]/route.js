import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = context.params.id
    const user = await prisma.user.findUnique({
        where: { id: id },
    })
    return NextResponse.json(user)
}
