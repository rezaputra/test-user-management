"use client"

import { addApplication } from "@/actions/add-application"
import { addGroup } from "@/actions/add-group"
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
import { Textarea } from "@/components/ui/textarea"
import { AddApplicationSchema } from "@/schemas/application"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { z } from "zod"

export function AddApplication() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm<z.infer<typeof AddApplicationSchema>>({
        resolver: zodResolver(AddApplicationSchema),
        defaultValues: {
            name: "",
            description: "",
            order: 1,
            source: "",
        },
    })

    const onSubmit = (values: z.infer<typeof AddApplicationSchema>) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            addApplication(values)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error)
                    }
                    if (data?.success) {
                        setSuccess(data.success)
                    }
                })
                .catch((error) => setError(error.message))
        })
    }

    return (
        <Dialog>
            <Button asChild variant="default" size="sm">
                <DialogTrigger>Add Application</DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-6">
                    <DialogHeader>
                        <span className=" text-lg font-semibold">Add Application</span>{" "}
                        <span className=" text-sm text-muted-foreground">Add new application</span>
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
                                                <Input
                                                    {...field}
                                                    placeholder="Application name"
                                                    type="text"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex space-x-4">
                                    <FormField
                                        control={form.control}
                                        name="order"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Order</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="number" disabled={isPending} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="source"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Source</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="http://example.com/app"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Role example" disabled={isPending} />
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
