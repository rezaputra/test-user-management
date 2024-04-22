"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { EditGroupSchema } from "@/schemas/group"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function editGroup(values: z.infer<typeof EditGroupSchema>) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validateFields = EditGroupSchema.safeParse(values)

        if (!validateFields.success) {
            return { error: "Invalid fields" }
        }
        const { groupId, name } = validateFields.data

        await db.group.update({ where: { id: groupId }, data: { name } })

        revalidatePath("/dashboard/settings/group")
        return { success: "Group updated successfully" }
    } catch {
        return { error: "Something went wrong!" }
    }
}
