"use client"

import { changeUserGroup } from "@/actions/change-user-group"
import { deleteUserGroup } from "@/actions/delete-user-group"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Group, User } from "@prisma/client"

import { ScanEye } from "lucide-react"
import Link from "next/link"
import { useState, useTransition } from "react"

interface ChangeGroupProps {
    user: User
    groups: Group[]
    userGroup: Group
}

export function ChangeGroup({ user, groups, userGroup }: ChangeGroupProps) {
    const [selectGroup, setSelectGroup] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const changeGroup = () => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            changeUserGroup(selectGroup as string, user.id)
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

    const deleteGroup = () => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            deleteUserGroup(user.id)
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
            <Button variant="ghost" size="sm" asChild>
                <DialogTrigger>
                    <ScanEye className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <span className=" text-lg font-semibold">Change access</span>
                    <span className=" text-sm text-muted-foreground">Allow access user to specific application</span>
                </DialogHeader>
                {user.role === "USER" ? (
                    <div className=" space-y-4 my-4">
                        <div className=" space-y-2">
                            <Label>Current group</Label>
                            {userGroup ? (
                                <Input disabled={true} value={userGroup.name} />
                            ) : (
                                <Input disabled={true} value={"No associated group"} />
                            )}

                            <Link href={"/dashboard/settings/group"}>
                                <Button variant="link" onClick={deleteGroup} className=" text-red-400">
                                    - Unassociated the group
                                </Button>
                            </Link>
                        </div>

                        <div className=" space-y-2">
                            <Label>Change to</Label>
                            <Select onValueChange={(value) => setSelectGroup(value)}>
                                <SelectTrigger className="w-full">
                                    {userGroup ? (
                                        <SelectValue placeholder={userGroup.name} />
                                    ) : (
                                        <SelectValue placeholder={"Select group"} />
                                    )}
                                </SelectTrigger>

                                <SelectContent>
                                    {groups.map((group, idx) => (
                                        <SelectItem key={idx} value={group.id}>
                                            {group.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Link href={"/dashboard/settings/group"}>
                                <Button variant="link">+ Create new group</Button>
                            </Link>
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                ) : (
                    <span className=" text-blue">Admin can access all application</span>
                )}

                <DialogFooter className=" flex w-full justify-end space-x-4">
                    {user.role === "USER" && (
                        <Button disabled={isPending || selectGroup === undefined} onClick={changeGroup}>
                            Save
                        </Button>
                    )}
                    <Button variant="outline" asChild>
                        <DialogClose>Close</DialogClose>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
