"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function groupApplicationConfig(groupId: string, applicationId: string) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // Find existing group application
        let groupApp = await db.groupApplication.findFirst({
            where: { groupId, applicationId },
            include: { group: true },
        })

        if (groupApp) {
            // Delete existing group application
            await db.groupApplication.delete({ where: { id: groupApp.id } })

            // Delete associated menu accesses
            await db.menuAccess.deleteMany({ where: { groupId } })

            revalidatePath("/dashboard/settings/application")
            return { success: `The ${groupApp.group.name} no longer has this application` }
        } else {
            // Create new group application
            groupApp = await db.groupApplication.create({
                data: {
                    groupId,
                    applicationId,
                },
                include: {
                    group: true,
                },
            })

            // Get all menus associated with the application
            const menus = await db.menu.findMany({ where: { applicationId } })

            // Create menu accesses for the new group application
            const menuAccesses = menus.map(async (menu) => {
                await db.menuAccess.create({
                    data: {
                        groupId,
                        menuId: menu.id,
                        canCreate: false,
                        canRead: false,
                        canUpdate: false,
                        canDelete: false,
                    },
                })
            })
            await Promise.all(menuAccesses)

            revalidatePath("/dashboard/settings/application")
            return { success: `The ${groupApp.group.name} has been assigned this application` }
        }
    } catch (error) {
        console.error(error)
        return { error: "An error occurred while configuring the application for the group" }
    }
}
