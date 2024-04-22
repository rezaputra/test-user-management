"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deleteUser(userId: string) {
    try {
        const authUser = await currentUser()

        if (!authUser || authUser.role !== "ADMIN") {
            return { error: "Unauthorized!" }
        }

        // Fetch the user by userId to check their role
        const userToDelete = await db.user.findUnique({
            where: { id: userId },
        })

        if (!userToDelete) {
            return { error: "User not found!" }
        }

        const adminCount = await db.user.count({
            where: { role: "ADMIN" },
        })

        if (adminCount <= 1 && userToDelete.role === "ADMIN") {
            return { error: "Admin is the only one left!" }
        }

        await db.user.delete({ where: { id: userId } })

        // Revalidate the dashboard settings users path
        revalidatePath("/dashboard/settings/users")

        return { success: "User deleted" }
    } catch (error) {
        console.error("Error deleting user:", error)
        return { error: "Internal server error" }
    }
}
