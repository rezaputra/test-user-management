import { currentUser } from "@/hooks/current-user"
import { AppIcon } from "./app-icon"
import { getApplicationByUserId } from "@/data/application"

export async function UserApplication() {
    const user = await currentUser()

    const applications = await getApplicationByUserId(user?.id as string)

    return (
        <div className=" p-4 bg-gray-200 space-y-6">
            <div className=" font-semibold">Welcome, {user?.name}</div>
            <div className="flex flex-wrap items-center space-x-4">
                {/* <AppIcon href={"/dashboard/settings"} icon="/assets/settings.png" name="App settings" /> */}

                {applications && applications.length > 0 ? (
                    applications.map((application, idx) => (
                        <AppIcon
                            key={idx}
                            href={application.application.source} // Ganti dengan path yang sesuai
                            name={application.application.name}
                        />
                    ))
                ) : (
                    <AppIcon href="#" icon="/assets/app-not-found.png" name="Not found app" />
                )}
            </div>
        </div>
    )
}
