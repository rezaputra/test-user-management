"use server"

import bcrypt from "bcryptjs"
import { getUserByEmail, getUserById } from "@/data/user"
import { db } from "@/lib/db"
import * as z from "zod"
import { currentUser } from "@/hooks/current-user"
import { EditUserSchema } from "@/schemas/user"
import { revalidatePath } from "next/cache"

export async function editUser(values: z.infer<typeof EditUserSchema>, userId: string) {
    const authUser = await currentUser()
    const user = await db.user.findUnique({ where: { id: userId } })

    const validateFields = EditUserSchema.safeParse(values)

    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }

    if (!user) {
        return { error: "User not found" }
    }

    if (authUser?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    const adminCount = await db.user.count({
        where: { role: "ADMIN" },
    })

    if (adminCount <= 1 && user.role === "ADMIN") {
        return { error: "Admin is the only one left!" }
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values?.email as string)

        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in user!" }
        }

        return { success: "Email updated" }
    }

    if (values.password && values.newPassword && user.password) {
        const passwordMatch = await bcrypt.compare(values.password, user.password)

        if (!passwordMatch) return { error: "Incorrect password" }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10)

        values.password = hashedPassword
        values.newPassword = undefined
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            ...values,
        },
    })

    revalidatePath("/dashboard/settings/users")

    return { success: "Settings updated" }
}
