"use client"

import { changeRole } from "@/actions/change-role"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

interface ChangeRoleProps {
    userId: string
    isAdmin: boolean
}

export function ChangeRole({ userId, isAdmin }: ChangeRoleProps) {
    const onClick = async () => {
        const res = await changeRole(userId, isAdmin)

        if (res.error) {
            toast.error(res.error)
        } else {
            toast.success(res.success)
        }
    }

    return <Checkbox checked={isAdmin} onClick={onClick} />
}
