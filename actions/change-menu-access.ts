"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function changeMenuAccess(accessType: "create" | "read" | "update" | "delete", id: string) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // Fetch the menu access by ID
        const menuAccess = await db.menuAccess.findUnique({
            where: { id },
        })

        if (!menuAccess) {
            return { error: "Menu access not found" }
        }

        // console.log(menuAccess)

        // Update the corresponding access type based on the provided access type
        switch (accessType) {
            case "create":
                console.log("create", !menuAccess.canCreate)
                await db.menuAccess.update({
                    where: { id },
                    data: { canCreate: !menuAccess.canCreate }, // Toggle the permission
                })
                break
            case "read":
                await db.menuAccess.update({
                    where: { id },
                    data: { canRead: !menuAccess.canRead }, // Toggle the permission
                })
                console.log("read")
                break
            case "update":
                await db.menuAccess.update({
                    where: { id },
                    data: { canUpdate: !menuAccess.canUpdate }, // Toggle the permission
                })
                console.log("update")
                break
            case "delete":
                await db.menuAccess.update({
                    where: { id },
                    data: { canDelete: !menuAccess.canDelete }, // Toggle the permission
                })
                console.log("delete")
                break
            default:
                return { error: "Invalid access type" }
        }

        revalidatePath("/dashboard/settings/menu")

        return { success: "Menu access updated successfully" }
    } catch (error) {
        console.error("Error changing menu access:", error)
        return { error: "An error occurred while changing menu access" }
    }
}
