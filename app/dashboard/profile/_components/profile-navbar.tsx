"use client"

import { UserAvatar } from "@/components/user-avatar"

export function ProfilesNavbar() {
    return (
        <div className=" w-full h-14  flex items-center border-2">
            <div className=" container flex item-center justify-between">
                <div className=" text-xl font-semibold">Logo</div>
                <UserAvatar />
            </div>
        </div>
    )
}
