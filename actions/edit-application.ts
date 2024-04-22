"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { EditApplicationSchema } from "@/schemas/application"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function editApplication(values: z.infer<typeof EditApplicationSchema>, id: string) {
    try {
        // Fetch the current user
        const authUser = await currentUser()

        // Check if the current user is an ADMIN
        if (!authUser || authUser.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        // Validate the input values against the schema
        const validateResult = EditApplicationSchema.safeParse(values)

        if (!validateResult.success) {
            return { error: "Invalid fields", errors: validateResult.error.errors }
        }

        const { name, order, description, source } = validateResult.data

        // Fetch the existing application by ID
        const existingApp = await db.application.findUnique({
            where: { id },
        })

        if (!existingApp) {
            return { error: "Application not found" }
        }

        // Initialize newOrder with the current order value
        let newOrder = existingApp.order

        // Check if the order has changed
        if (order !== existingApp.order) {
            // Adjust conflicting applications' order
            const conflictingApplications = await db.application.findMany({
                where: {
                    order: {
                        gte: order,
                    },
                    id: {
                        not: id,
                    },
                },
                orderBy: {
                    order: "desc",
                },
            })

            for (const app of conflictingApplications) {
                let isUnique = false

                while (!isUnique) {
                    const existingAppWithNewOrder = await db.application.findFirst({
                        where: { order: newOrder },
                    })

                    if (!existingAppWithNewOrder || existingAppWithNewOrder.id === app.id) {
                        isUnique = true
                    } else {
                        newOrder++
                    }
                }

                // Update conflicting application with new order
                await db.application.update({
                    where: { id: app.id },
                    data: { order: newOrder },
                })

                newOrder++
            }
        }

        // Update the application details
        await db.application.update({
            where: { id },
            data: { name, order, source, description },
        })

        // Revalidate the dashboard settings application path
        revalidatePath("/dashboard/settings/application")

        return { success: "Application updated successfully" }
    } catch (error: any) {
        console.error("Error editing application:", error)
        return { error: "Something went wrong!" }
    }
}
