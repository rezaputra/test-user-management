"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { EditGroupSchema } from "@/schemas/group"
import { revalidatePath } from "next/cache"

export async function deleteApplication(applicationId: string) {
    try {
        const authUser = await currentUser()

        if (!authUser || authUser.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // Find and delete associated GroupApplications first
        const groupApplications = await db.groupApplication.findMany({
            where: { applicationId: applicationId },
        })

        for (const groupApp of groupApplications) {
            await db.groupApplication.delete({
                where: { id: groupApp.id },
            })
        }

        // Now delete the Application
        await db.application.delete({ where: { id: applicationId } })

        // Revalidate the dashboard page
        await revalidatePath("/dashboard/settings/application")

        return { success: "Application deleted successfully" }
    } catch (error: any) {
        console.error(error.message)
        return { error: "Something went wrong!" }
    }
}
