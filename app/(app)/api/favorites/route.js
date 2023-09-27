import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const favorites = await prisma.favorite.findMany()

    return NextResponse.json(favorites)
}

export async function POST(req) {
    const body = await req.json()
    const favorite = await prisma.favorite.create({ data: body })

    return NextResponse.json(favorite)
}
