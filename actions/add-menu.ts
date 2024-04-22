"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { AddMenuSchema } from "@/schemas/menu"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function addMenu(values: z.infer<typeof AddMenuSchema>) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validateFields = AddMenuSchema.safeParse(values)

        if (!validateFields.success) {
            return { error: "Invalid fields" }
        }
        const { applicationId, name } = validateFields.data

        await db.menu.create({ data: { name, applicationId } })

        revalidatePath("/dashboard/settings/menu")
        return { success: "Menu added successfully" }
    } catch {
        return { error: "Something went wrong!" }
    }
}
