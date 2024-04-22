"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deleteUserGroup(userId: string) {
    try {
        // Fetch the current user
        const authUser = await currentUser()

        // Check if the current user is an ADMIN
        if (!authUser || authUser.role !== "ADMIN") {
            return { error: "Only ADMIN can change groups" }
        }

        // Update the user's group to null in the database
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { groupId: null },
            include: { group: true }, // Include group information in the response
        })

        if (!updatedUser.group) {
            return { error: "User is not part of any group!" }
        }

        revalidatePath("/dashboard/settings/users")

        return { success: `User has been removed from ${updatedUser.group.name}` }
    } catch (error) {
        console.error("Error deleting user group:", error)
        return { error: "Internal server error!" }
    }
}
