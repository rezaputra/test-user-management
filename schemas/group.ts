import { z } from "zod"

export const AddGroupSchema = z.object({
    name: z.string().min(1, { message: "Group name is required" }),
})

export const EditGroupSchema = z.object({
    groupId: z.string().min(1, { message: "Group id is required" }),
    name: z.string().min(1, { message: "Group name is required" }),
})
