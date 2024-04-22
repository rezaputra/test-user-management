"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { AddGroupSchema } from "@/schemas/group"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function addGroup(values: z.infer<typeof AddGroupSchema>) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validateFields = AddGroupSchema.safeParse(values)

        if (!validateFields.success) {
            return { error: "Invalid fields" }
        }

        const { name } = validateFields.data

        await db.group.create({ data: { name } })

        revalidatePath("/dashboard/settings/group")
        return { success: "Group added successfully" }
    } catch {
        return { error: "Something went wrong!" }
    }
}
