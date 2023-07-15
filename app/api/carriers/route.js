import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const carriers = await prisma.carrier.findMany()
    return NextResponse.json(carriers)
}

export async function POST(req) {
    const body = await req.json()
    const carrier = await prisma.carrier.create({ data: body })

    return NextResponse.json(carrier)
}
