"use client"

import { groupApplicationConfig } from "@/actions/group-application-config"
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
import { db } from "@/lib/db"
import { Application, Group, GroupApplication } from "@prisma/client"
import { ScanEye } from "lucide-react"
import { useState, useTransition } from "react"

interface AccessApplicationProps {
    application: Application
    appGroupIds: string[]
    groups: Group[]
}

export function AccessApplication({ appGroupIds, application, groups }: AccessApplicationProps) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const onCheckedChange = (groupId: string) => {
        setError(undefined)
        setSuccess(undefined)

        startTransition(() => {
            groupApplicationConfig(groupId, application.id)
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
                <div className="space-y-8">
                    <DialogHeader>
                        <h2 className="text-2xl font-semibold">Application Access</h2>
                        <p className="text-sm text-gray-500">Assign group to access this application</p>
                    </DialogHeader>

                    <div className="space-y-3">
                        {groups.map((group, idx) => (
                            <div key={idx} className="flex items-center space-x-4 bg-slate-200 rounded-md p-2">
                                <Checkbox
                                    className=""
                                    value={group.id}
                                    checked={appGroupIds.includes(group.id)}
                                    onCheckedChange={() => onCheckedChange(group.id)}
                                />
                                <span className="">{group.name}</span>
                            </div>
                        ))}
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
