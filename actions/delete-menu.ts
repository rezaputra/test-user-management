"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deleteMenu(id: string) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // Start a transaction
        await db.$transaction([
            // Delete menu accesses associated with the menu
            db.menuAccess.deleteMany({ where: { menuId: id } }),
            // Delete the menu itself
            db.menu.delete({ where: { id } }),
        ])

        revalidatePath("/dashboard/settings/menu")
        return { success: "Menu and associated accesses deleted successfully" }
    } catch (error) {
        console.log("Error deleting menu:", error)
        return { error: "Something went wrong!" }
    }
}
