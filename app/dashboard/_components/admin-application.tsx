import { db } from "@/lib/db"
import { AppIcon } from "./app-icon"
import { currentUser } from "@/hooks/current-user"

export async function AdminApplication() {
    const applications = await db.application.findMany()

    const user = await currentUser()

    return (
        <div className=" p-4 bg-gray-200 space-y-6">
            <div className=" font-semibold">
                Welcome, {user?.name} - {user?.role}
            </div>
            <div className="flex flex-wrap items-center gap-4">
                <AppIcon href={"/dashboard/settings"} icon="/assets/settings.png" name="Settings" />

                {applications.length > 0 && (
                    <div className=" flex space-x-4">
                        {applications.map((application, idx) => (
                            <AppIcon key={idx} href={application.source} name={application.name} />
                        ))}
                    </div>
                )}

                <AppIcon href={"/dashboard/settings/application"} icon="/assets/add-application.png" name="create" />
            </div>
        </div>
    )
}
