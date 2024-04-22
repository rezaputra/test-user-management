"use client"

import { editGroup } from "@/actions/edit-group"
import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EditGroupSchema } from "@/schemas/group"
import { zodResolver } from "@hookform/resolvers/zod"
import { Group } from "@prisma/client"
import { Edit } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface EditGroupProps {
    group: Group
}

export function EditGroup({ group }: EditGroupProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm<z.infer<typeof EditGroupSchema>>({
        resolver: zodResolver(EditGroupSchema),
        defaultValues: {
            groupId: group.id,
            name: group.name,
        },
    })

    const onSubmit = (values: z.infer<typeof EditGroupSchema>) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            editGroup(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error)
                    }
                    if (data?.success) {
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }
    return (
        <Dialog>
            <Button asChild variant="default" size="sm">
                <DialogTrigger>
                    <Edit className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-6">
                    <DialogHeader>
                        <span className=" text-lg font-semibold">Add Group</span>{" "}
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <div className="flex justify-end space-x-2">
                                <Button type="submit" disabled={isPending}>
                                    Save
                                </Button>
                                <Button asChild variant="outline">
                                    <DialogClose>Close</DialogClose>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
