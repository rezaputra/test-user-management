import { ProfilesNavbar } from "./_components/profile-navbar"
import { SideNav } from "./_components/profile-sidenav"

function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ProfilesNavbar />
            <div className=" flex container w-full">
                <div className=" w-80">
                    <SideNav />
                </div>
                <div className=" w-full">{children}</div>
            </div>
        </div>
    )
}

export default ProfileLayout
