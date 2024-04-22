import { db } from "@/lib/db"
import { HttpStatusCode } from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
    console.log("hola")
    try {
        const menu = await db.menu.findMany()

        if (menu) {
            return NextResponse.json({ menu })
        }
        return NextResponse.json({ message: `Not found` }, { status: HttpStatusCode.NotFound })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest })
    }
}
