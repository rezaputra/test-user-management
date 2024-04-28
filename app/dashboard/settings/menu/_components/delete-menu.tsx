"use client"

import { deleteGroup } from "@/actions/delete-group"
import { deleteMenu } from "@/actions/delete-menu"
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
import { Group, Menu } from "@prisma/client"
import { Edit, Trash } from "lucide-react"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface DeleteMenuProps {
    menu: Menu
}

export function DeleteMenu({ menu }: DeleteMenuProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const onClick = () => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            deleteMenu(menu.id)
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
            <Button asChild variant="destructive" size="sm">
                <DialogTrigger>
                    <Trash className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-6">
                    <DialogHeader>
                        <span className=" text-lg font-semibold">Delete Menu</span>{" "}
                    </DialogHeader>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <div className="flex justify-end space-x-2">
                        <Button variant="destructive" size="sm" type="submit" disabled={isPending} onClick={onClick}>
                            Delete
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            <DialogClose>Close</DialogClose>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
