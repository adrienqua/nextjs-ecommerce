import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const addresses = await prisma.address.findMany()
    console.log(addresses)
    return NextResponse.json(addresses)
}

export async function POST(req) {
    const body = await req.json()
    const address = await prisma.address.create({ data: body })
    console.log(address)

    return NextResponse.json(address)
}
