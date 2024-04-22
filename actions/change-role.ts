"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function changeRole(userId: string, isAdmin: boolean) {
    try {
        const user = await currentUser()

        // Check if the current user is an ADMIN
        if (!user || user.role !== "ADMIN") {
            return { error: "Only ADMIN can change roles" }
        }

        // Count the number of users with the ADMIN role
        const adminCount = await db.user.count({
            where: { role: "ADMIN" },
        })

        // Check if there's only one ADMIN left
        if (adminCount <= 1 && isAdmin) {
            return { error: "Admin is the only one left!" }
        }

        // Determine the new role based on the isAdmin boolean
        const newRole = isAdmin ? "USER" : "ADMIN"

        // Update the user's role in the database
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { role: newRole },
        })

        revalidatePath("/dashboard/settings/users")

        return { success: `${updatedUser.name} has been updated to ${newRole}` }
    } catch (error) {
        console.error("Error updating user role:", error)
        return { error: "Internal server error!" }
    }
}
