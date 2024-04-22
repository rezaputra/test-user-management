"use client"

import { editUser } from "@/actions/edit-user"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditUserSchema } from "@/schemas/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, UserRole } from "@prisma/client"
import { Edit } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { z } from "zod"

interface EditUserProps {
    user: User
}

export function EditUser({ user }: EditUserProps) {
    const { update } = useSession()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const form = useForm<z.infer<typeof EditUserSchema>>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            role: user?.role || undefined,
            password: undefined,
            newPassword: undefined,
        },
    })

    const onSubmit = (values: z.infer<typeof EditUserSchema>) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            editUser(values, user.id)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error)
                    }
                    if (data?.success) {
                        update()
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <Dialog>
            <Button asChild size="sm">
                <DialogTrigger>
                    <Edit className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader className=" mb-4">
                    <span className=" text-lg font-semibold">Edit user</span>{" "}
                    <span className=" text-sm text-muted-foreground">Edit the selected user information</span>
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
                                            <Input {...field} placeholder="John Doe" type="text" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="johndoe@example.com"
                                                type="email"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={UserRole.ADMIN}>ADMIN</SelectItem>
                                                <SelectItem value={UserRole.USER}>USER</SelectItem>
                                            </SelectContent>
                                        </Select>
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
            </DialogContent>
        </Dialog>
    )
}
