"use client"

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
import { AddMenuSchema } from "@/schemas/menu"
import { zodResolver } from "@hookform/resolvers/zod"
import { Application } from "@prisma/client"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { Input } from "@/components/ui/input"
import { useState, useTransition } from "react"
import { addMenu } from "@/actions/add-menu"

interface AddMenuProps {
    applications: Application[]
}

export function AddMenu({ applications }: AddMenuProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm<z.infer<typeof AddMenuSchema>>({
        resolver: zodResolver(AddMenuSchema),
        defaultValues: {
            applicationId: "",
            name: "",
        },
    })

    const onSubmit = (values: z.infer<typeof AddMenuSchema>) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            addMenu(values)
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
                <DialogTrigger>Add Menu</DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-6">
                    <DialogHeader>
                        <span className=" text-lg font-semibold">Add Menu</span>{" "}
                        <span className=" text-sm text-muted-foreground">Add application menu</span>
                    </DialogHeader>

                    <Form {...form}>
                        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="applicationId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select application" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Select application</SelectLabel>
                                                            {applications.map((application, idx) => (
                                                                <SelectItem key={idx} value={application.id}>
                                                                    {application.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Menu name"
                                                    type="text"
                                                    disabled={isPending}
                                                />
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
