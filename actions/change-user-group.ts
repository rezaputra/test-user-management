"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function changeUserGroup(groupId: string, userId: string) {
    try {
        // Fetch the current user
        const authUser = await currentUser()

        // Check if the current user is an ADMIN
        if (!authUser || authUser.role !== "ADMIN") {
            return { error: "Only ADMIN can change groups" }
        }

        // Update the user's group in the database
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { groupId },
            include: { group: true },
        })

        if (!updatedUser.group) {
            return { error: "Group not found!" }
        }

        // Revalidate the dashboard settings users path
        revalidatePath("/dashboard/settings/users")

        return { success: `Group has changed to ${updatedUser.group.name}` }
    } catch (error) {
        console.error("Error updating user role:", error)
        return { error: "Internal server error!" }
    }
}
