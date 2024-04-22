"use client"

import { AppWindow, GanttChart, Group, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"
import { SideButton } from "./side-button"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SettingsSidebar() {
    const pathname = usePathname()

    return (
        <div className=" w-72 px-2 pt-10 min-h-screen border-r-2 ">
            <div className=" h-80 flex flex-col justify-between">
                <Link
                    href={"/dashboard"}
                    className=" rounded-sm flex items-center space-x-4 cursor-pointer p-2 px-4 hover:bg-slate-200 "
                >
                    <LayoutDashboard className=" size-5" />
                    <span className=" text-sm hidden lg:flex">Dashboard</span>
                </Link>

                <div>
                    {/* <SideButton Icon={Settings} href="" title="Home" /> */}
                    <SideButton Icon={Group} href={`/dashboard/settings/group`} title="Group" />
                    <SideButton Icon={AppWindow} href={`/dashboard/settings/application`} title="Application" />
                    <SideButton Icon={GanttChart} href={`/dashboard/settings/menu`} title="Menu" />
                    <SideButton Icon={Users} href={`/dashboard/settings/users`} title="Users" />
                </div>

                <div
                    onClick={() => signOut()}
                    className=" rounded-sm flex items-center space-x-4 cursor-pointer p-2 px-4 hover:bg-slate-200 "
                >
                    <LogOut className=" size-5" />
                    <span className="  text-sm hidden lg:flex">Sign Out</span>
                </div>
            </div>
        </div>
    )
}
