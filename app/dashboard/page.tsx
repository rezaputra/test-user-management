import { DashNavbar } from "./_components/dash-navbar"
import { AdminApplication } from "./_components/admin-application"
import { currentUser } from "@/hooks/current-user"
import { UserApplication } from "./_components/user-application"

async function DashboardPage() {
    const user = await currentUser()

    return (
        <div className=" bg-slate-100 flex flex-col min-h-screen  w-full items-center justify-center">
            <div className=" w-[700px]">
                <DashNavbar />
                {user?.role === "ADMIN" && <AdminApplication />}
                {user?.role === "USER" && <UserApplication />}
            </div>
        </div>
    )
}

export default DashboardPage
