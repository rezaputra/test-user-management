"use server"

import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas/auth"

import bcrypt from "bcryptjs"
import { z } from "zod"

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validateFields = RegisterSchema.safeParse(values)

    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }

    const { name, email, password } = validateFields.data

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return { error: "Email already in use!" }
    }

    const hashPassword = await bcrypt.hash(password, 10)

    await db.user.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
    })

    // TODO: Generate verification token and send it to user email

    return { success: "Account created successfully" }
}
