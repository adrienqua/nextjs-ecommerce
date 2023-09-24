import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const carriers = await prisma.carrier.findMany()
    /*     const computedCarriers = carriers.map((carrier) => {
        carrier.computed = carrier.name + " " + carrier.description
        return carrier
    })
 */
    return NextResponse.json(computedCarriers)
}

export async function POST(req) {
    const body = await req.json()
    const carrier = await prisma.carrier.create({ data: body })

    return NextResponse.json(carrier)
}
