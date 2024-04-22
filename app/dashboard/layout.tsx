import { auth } from "@/auth"
import { currentUser } from "@/hooks/current-user"
import { notFound } from "next/navigation"

async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await currentUser()

    if (!user) {
        return notFound()
    }

    return <div>{children}</div>
}

export default DashboardLayout
