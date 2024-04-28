import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const authUser = await currentUser()

        if (!authUser || authUser.role !== "ADMIN") {
            return NextResponse.json({ error: false, message: "Unauthorized" })
        }

        const url = new URL(req.url)
        const id = url.searchParams.get("id")

        console.log(id)

        let applications = null

        if (!id || id === "") {
            applications = await db.application.findMany()
        } else {
            applications = await db.application.findMany({ where: { id } })
        }

        if (!applications || applications.length === 0) {
            return NextResponse.json({ error: true, message: "No data provided!" })
        } else {
            return NextResponse.json({ error: false, data: applications })
        }
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: true, message: "Internal server error!" })
    }
}
