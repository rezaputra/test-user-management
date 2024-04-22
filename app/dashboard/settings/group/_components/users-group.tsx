"use client"

import { useState, useTransition } from "react"
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
import { User } from "@prisma/client"
import { Users } from "lucide-react"
import { X } from "lucide-react" // Import the X icon from lucide-react
import { deleteGroupMember } from "@/actions/delete-group-member"

interface UsersGroupProps {
    users: User[]
}

export function UsersGroup({ users }: UsersGroupProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const handleDeleteUser = (user: User) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            deleteGroupMember(user.id)
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
            <Button asChild variant="ghost" size="sm">
                <DialogTrigger>
                    <Users className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-6">
                    <DialogHeader>
                        <span className=" text-lg font-semibold">Users Group</span>{" "}
                    </DialogHeader>

                    <div className="space-y-2">
                        {users.length < 1 && <div>Group does not have any members</div>}
                        {users.map((user) => (
                            <div key={user.id} className="flex space-x-4 items-center bg-slate-200 p-2 rounded-md">
                                <X className="size-4 cursor-pointer" onClick={() => handleDeleteUser(user)} />

                                <span className=" underline ">{user.email}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
