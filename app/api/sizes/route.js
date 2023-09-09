import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const sizes = await prisma.size.findMany()
    return NextResponse.json(sizes)
}

export async function POST(req) {
    const body = await req.json()
    const size = await prisma.size.create({ data: body })

    return NextResponse.json(size)
}
