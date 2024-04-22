"use client"

import { useCurrentUser } from "@/hooks/use-current-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { IoLogOutOutline } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { MdOutlineSettings } from "react-icons/md"
import { MdOutlineMeetingRoom } from "react-icons/md"

import {} from "react-icons"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { LayoutDashboard } from "lucide-react"

export function UserAvatar() {
    const user = useCurrentUser()

    if (!user) return null

    const logout = () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className=" size-7">
                    <AvatarImage src={user.image || undefined} alt="User" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" min-w-64">
                <DropdownMenuLabel className="m-2 text-sm font-normal text-muted-foreground">
                    {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={`/dashboard/profile`}>
                        <DropdownMenuItem>
                            <CgProfile className=" w-4 h-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <MdOutlineMeetingRoom className="w-4 h-4 mr-2" />
                            Settings
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <Link
                                    target="_top"
                                    href={{
                                        pathname: `/${user.id}/appointment`,
                                        query: { tab: "schedule" },
                                    }}
                                >
                                    <DropdownMenuItem>Application</DropdownMenuItem>
                                </Link>
                                <Link
                                    target="_top"
                                    href={{ pathname: `/${user.id}/appointment`, query: { tab: "create" } }}
                                >
                                    <DropdownMenuItem>Change password</DropdownMenuItem>
                                </Link>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub> */}
                    <Link href={`/dashboard`}>
                        <DropdownMenuItem>
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                        </DropdownMenuItem>
                    </Link>
                    <Link href={`/dashboard/settings`}>
                        <DropdownMenuItem>
                            <MdOutlineSettings className="w-4 h-4 mr-2" />
                            Setting
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <IoLogOutOutline className=" w-4 h-4 mr-2" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
