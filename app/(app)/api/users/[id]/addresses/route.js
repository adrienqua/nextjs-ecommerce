import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, context) {
    const id = context.params.id
    const addresses = await prisma.address.findMany({
        where: { userId: id },
    })
    return NextResponse.json(addresses)
}
