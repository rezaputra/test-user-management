import { db } from "@/lib/db"
import { HttpStatusCode } from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const applications = await db.application.findMany()

        if (applications) {
            return NextResponse.json({ applications })
        }
        return NextResponse.json({ message: `No application provided` }, { status: HttpStatusCode.NotFound })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest })
    }
}
