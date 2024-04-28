"use client"

import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { CgProfile } from "react-icons/cg"
import { IoHomeOutline } from "react-icons/io5"
import { MdOutlineMeetingRoom, MdOutlineSettings } from "react-icons/md"

export function SideNav() {
    const pathname = usePathname()

    const params = useParams<{ userId: string }>()
    const userId = params.userId

    return (
        <div className="flex flex-col p-4 justify-between min-h-screen border-r-2">
            <div className="flex flex-col space-y-2">
                <Link href="/dashboard/profile">
                    <Button
                        size="lg"
                        variant="ghost"
                        className={cn("px-4  font-normal flex justify-start items-center gap-x-4 w-full", {
                            " font-semibold bg-slate-200 hover:bg-primary/10": pathname === `/dashboard/profile`,
                        })}
                    >
                        <CgProfile className="w-4 h-4" />
                        Profile
                    </Button>
                </Link>

                <Link href={`/dashboard/profile/setting`}>
                    <Button
                        size="lg"
                        variant="ghost"
                        className={cn("px-4 font-normal flex justify-start items-center gap-x-4 w-full", {
                            " font-semibold bg-primary/5 hover:bg-primary/10":
                                pathname === `/dashboard/profile/setting`,
                        })}
                    >
                        <MdOutlineSettings className="w-4 h-4" />
                        Setting
                    </Button>
                </Link>
            </div>
            <div className="flex items-center justify-between px-2">
                <Link href={"/dashboard"}>
                    <Button size="icon" variant="outline">
                        <IoHomeOutline className="w-4 h-4" />
                    </Button>
                </Link>
                <UserAvatar />
            </div>
        </div>
    )
}
