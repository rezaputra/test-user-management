import { z } from "zod"

export const AddApplicationSchema = z.object({
    name: z.string().min(1, { message: "Application name is required" }),
    description: z.optional(z.string().min(1, { message: "Application description is not string" })),
    order: z.number().min(1, { message: "Application order is required" }),
    source: z.string().min(1, { message: "Application source is required" }),
})

export const EditApplicationSchema = z.object({
    name: z.optional(z.string().min(1, { message: "Application name is required" })),
    description: z.optional(z.string().min(1, { message: "Application description is required" })),
    order: z.optional(z.number().min(1, { message: "Order must be a positive number" })),
    source: z.optional(z.string().min(1, { message: "Application source is required" })),
})
