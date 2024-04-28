"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { EditMenuSchema } from "@/schemas/menu"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function editMenu(values: z.infer<typeof EditMenuSchema>) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validateFields = EditMenuSchema.safeParse(values)

        if (!validateFields.success) {
            return { error: "Invalid fields" }
        }
        const { id, name, source } = validateFields.data

        await db.menu.update({ where: { id }, data: { name, source } })

        revalidatePath("/dashboard/settings/menu")
        return { success: "Menu updated successfully" }
    } catch {
        return { error: "Something went wrong!" }
    }
}
