"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function SideButton({
    Icon,
    href,
    title,
    label,
    className,
}: {
    Icon: LucideIcon
    href: string
    title: string
    label?: string
    className?: string
}) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={cn(
                `flex w-full rounded-sm items-center p-2 px-4 justify-between  hover:bg-slate-200`,
                { "bg-blue-200 font-semibold": pathname === href },
                `${className}`
            )}
        >
            <div className="  flex items-center space-x-4">
                <Icon className=" size-5" />
                <span className=" text-sm  hidden lg:flex">{title}</span>
            </div>
            {label && (
                <span className=" hidden lg:flex text-xs text-background bg-primary rounded-md px-2">{label}</span>
            )}
        </Link>
    )
}
