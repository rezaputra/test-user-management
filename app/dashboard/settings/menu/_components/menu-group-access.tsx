"use client"

import { changeMenuAccess } from "@/actions/change-menu-access"
import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Group, MenuAccess } from "@prisma/client"
import { ScanEye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

interface ExtendMenuAccesses extends MenuAccess {
    group: Group
}

interface MenuGroupAccessProps {
    menuAccesses: ExtendMenuAccesses[]
}

export function MenuGroupAccess({ menuAccesses }: MenuGroupAccessProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const onClick = (access: "create" | "read" | "update" | "delete", id: string) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            changeMenuAccess(access, id)
                .then((data) => {
                    if (data?.error) {
                        setError(data.error)
                        router.refresh()
                    }
                    if (data?.success) {
                        setSuccess(data.success)
                        router.refresh()
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <Dialog>
            <Button asChild variant="ghost" size="sm">
                <DialogTrigger>
                    <ScanEye className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-4">
                    <DialogHeader>
                        <span className=" text-lg font-semibold">Menu Access</span>{" "}
                        <span className=" text-sm text-muted-foreground">Control Menu Access by group CRUD</span>{" "}
                    </DialogHeader>

                    <Table>
                        <TableCaption>A list of all menu.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Group</TableHead>
                                <TableHead className="text-center">Create</TableHead>
                                <TableHead className="text-center">Read</TableHead>
                                <TableHead className="text-center">Update</TableHead>
                                <TableHead className="text-center">Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {menuAccesses.map((access, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="text-left">{access.group.name}</TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            defaultChecked={access.canCreate}
                                            onCheckedChange={() => onClick("create", access.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            defaultChecked={access.canRead}
                                            onCheckedChange={() => onClick("read", access.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            defaultChecked={access.canUpdate}
                                            onCheckedChange={() => onClick("update", access.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Checkbox
                                            defaultChecked={access.canDelete}
                                            onCheckedChange={() => onClick("delete", access.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
