"use client"

import { deleteUser } from "@/actions/delete-user"
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
import { Trash } from "lucide-react"
import { useState, useTransition } from "react"

interface DeleteUserProps {
    userId: string
}

export function DeleteUser({ userId }: DeleteUserProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const onClick = () => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            deleteUser(userId)
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
            <Button variant="destructive" size="sm" asChild>
                <DialogTrigger>
                    <Trash className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <span className=" text-lg font-semibold">Delete user</span>
                    <span className=" text-sm text-muted-foreground">
                        The user will delete permanently!, Are you sure?
                    </span>
                </DialogHeader>
                <FormError message={error} />
                <FormSuccess message={success} />
                <DialogFooter className=" space-x-4">
                    <Button variant="destructive" onClick={onClick} disabled={isPending}>
                        Delete
                    </Button>
                    <Button asChild variant="outline">
                        <DialogClose>Close</DialogClose>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
