import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const colors = await prisma.color.findMany()
    return NextResponse.json(colors)
}

export async function POST(req) {
    const body = await req.json()
    const color = await prisma.color.create({ data: body })

    return NextResponse.json(color)
}
