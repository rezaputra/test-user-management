import { auth } from "@/auth"
import { SettingsNavbar } from "./_components/setting-navbar"
import { SettingsSidebar } from "./_components/setting-sidebar"

async function SettingsLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    const user = session?.user

    if (user?.role === "USER") {
        return null
    }

    return (
        <div className=" min-h-screen">
            <SettingsNavbar />
            <div className=" container flex w-full">
                <SettingsSidebar />
                <div className=" w-full p-4">{children}</div>
            </div>
        </div>
    )
}

export default SettingsLayout
