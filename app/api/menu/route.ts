import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const authUser = await currentUser()

        if (!authUser || authUser.role !== "ADMIN") {
            return NextResponse.json({ error: true, message: "Unauthorized" })
        }

        const url = new URL(req.url)
        const applicationId = url.searchParams.get("applicationId")

        let menus

        if (!applicationId || applicationId === "") {
            menus = await db.menu.findMany({
                include: { application: true, menuAccesses: { include: { group: true } } },
            })
        } else {
            menus = await db.menu.findMany({
                where: { applicationId },
                include: { application: true, menuAccesses: { include: { group: true } } },
            })
        }

        if (!menus || menus.length === 0) {
            return NextResponse.json(menus)
        }

        return NextResponse.json(menus)
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: true, message: "Internal server error!" })
    }
}
