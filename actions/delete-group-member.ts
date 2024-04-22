"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { EditGroupSchema } from "@/schemas/group"
import { revalidatePath } from "next/cache"

export async function deleteGroupMember(userId: string) {
    try {
        const authUser = await currentUser()

        if (!authUser || authUser.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // Find the group associated with the user
        const group = await db.group.findFirst({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        })

        if (!group) {
            return { error: "User not found in any group" }
        }

        // Remove the user from the group
        await db.group.update({
            where: { id: group.id },
            data: {
                users: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        })

        revalidatePath("/dashboard/settings/group")
        return { success: "User deleted from group successfully" }
    } catch (error: any) {
        console.error(error.message)
        return { error: "Something went wrong!" }
    }
}
