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

        const { applicationId, name, source } = validateFields.data

        // Step 1: Create a new menu
        const newMenu = await db.menu.create({ data: { name, applicationId, source } })

        // Step 2: Get groups associated with the application
        const groupsWithApplication = await db.groupApplication.findMany({
            where: { applicationId },
            include: { group: true },
        })

        // Step 3: Create menu accesses for each group
        const menuAccesses = groupsWithApplication.map(async (groupApplication) => {
            const { group } = groupApplication
            await db.menuAccess.create({
                data: {
                    groupId: group.id,
                    menuId: newMenu.id,
                    canCreate: false,
                    canRead: false,
                    canUpdate: false,
                    canDelete: false,
                },
            })
        })
        await Promise.all(menuAccesses)

        revalidatePath("/dashboard/settings/menu")
        return { success: "Menu added successfully" }
    } catch (error) {
        console.error("Error adding menu:", error)
        return { error: "Something went wrong!" }
    }
}
