"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export function DashNavbar() {
    const logout = () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <div className=" min-w-96 w-full-max bg-blue-900 flex items-center p-4 rounded-t-lg justify-between ">
            <div className=" bg-white p-1 rounded-2xl">
                <Image src={"/assets/usi.png"} alt="University logo" width={80} height={80} />
            </div>
            <div className=" space-x-2">
                <Link href={"/dashboard/profile"}>
                    <Button>Profile</Button>
                </Link>
                <Button onClick={logout}>Sign Out</Button>
            </div>
        </div>
    )
}
