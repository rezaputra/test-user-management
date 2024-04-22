"use client"

import Image from "next/image"
import Link from "next/link"

export function AppIcon({ href, icon, name }: { href: string; icon?: string; name: string }) {
    return (
        <Link href={href}>
            <div className=" flex flex-col rounded-m p-2 items-center space-y-2 bg-secondary rounded-md min-w-32 hover:bg-primary/10">
                {icon ? (
                    <Image src={icon} alt="App icon" width={50} height={50} />
                ) : (
                    <Image src={"/assets/default-app-icon.png"} alt="App icon" width={50} height={50} />
                )}
                <span className=" text-sm font-semibold">{name}</span>
            </div>
        </Link>
    )
}
