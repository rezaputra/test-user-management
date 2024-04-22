"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function groupApplicationConfig(groupId: string, applicationId: string) {
    console.log(groupId)
    console.log(applicationId)
    console.log("no data")
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        let groupApp = await db.groupApplication.findFirst({
            where: { groupId, applicationId },
            include: { group: true },
        })

        if (groupApp) {
            await db.groupApplication.delete({ where: { id: groupApp.id } })
            revalidatePath("/dashboard/settings/application")
            return { success: `The ${groupApp.group.name} no longer has this application` }
        } else {
            groupApp = await db.groupApplication.create({
                data: {
                    groupId,
                    applicationId,
                },
                include: {
                    group: true,
                },
            })
            revalidatePath("/dashboard/settings/application")
            return { success: `The ${groupApp.group.name} has been assigned this application` }
        }
    } catch (error) {
        console.log(error)
        return { error: "An error occurred while configuring the application for the group" }
    }
}
