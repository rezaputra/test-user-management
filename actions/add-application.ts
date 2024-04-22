"use server"

import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { AddApplicationSchema } from "@/schemas/application"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function addApplication(values: z.infer<typeof AddApplicationSchema>) {
    try {
        const authUser = await currentUser()

        if (authUser?.role !== "ADMIN") {
            return { error: "Unauthorized" }
        }

        const validateFields = AddApplicationSchema.safeParse(values)

        if (!validateFields.success) {
            return { error: "Invalid fields" }
        }

        const { name, order, description, source } = validateFields.data

        // Check for conflicting applications
        const conflictingApplications = await db.application.findMany({
            where: {
                order: {
                    gte: order,
                },
            },
            orderBy: {
                order: "desc",
            },
        })

        let newOrder = order

        // Adjust order for conflicting applications
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

        // Add the new application with the desired order
        await db.application.create({
            data: { name, order, source, description },
        })

        revalidatePath("/dashboard/settings/application")
        return { success: "Application added successfully" }
    } catch (error: any) {
        console.log(error.message)
        return { error: "Something went wrong!" }
    }
}
