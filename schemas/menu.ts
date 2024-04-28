import { z } from "zod"

export const AddMenuSchema = z.object({
    applicationId: z.string().min(1, { message: "Application id is required" }),
    name: z.string().min(1, { message: "Group name is required" }),
    source: z.string().min(1, { message: "Group source is required" }),
})

export const EditMenuSchema = z.object({
    id: z.string().min(1, { message: "Application id is required" }),
    name: z.string().min(1, { message: "Group name is required" }),
    source: z.string().min(1, { message: "Group source is required" }),
})
