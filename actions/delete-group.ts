"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { EditGroupSchema } from "@/schemas/group"
import { revalidatePath } from "next/cache"

export async function deleteGroup(groupId: string) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        await db.group.delete({ where: { id: groupId } })

        revalidatePath("/dashboard/settings/group")
        return { success: "Group deleted successfully" }
    } catch {
        return { error: "Something went wrong!" }
    }
}
