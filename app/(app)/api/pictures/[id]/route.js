import { prisma } from "@/app/lib/prisma"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function DELETE(req, context) {
    const id = parseInt(context.params.id)

    const picture = await prisma.picture.delete({
        where: { id: id },
    })
    return NextResponse.json(true)
}
