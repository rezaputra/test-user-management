import { User } from "@prisma/client"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface UserDetailProps {
    user: User
}

export function UserDetail({ user }: UserDetailProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <span className=" underline cursor-pointer">{user.email}</span>
            </DialogTrigger>
            <DialogContent>
                <div className="flex items-center space-x-8">
                    {/* Profile Image */}
                    <div className="relative w-20 h-20">
                        <Image
                            src={"/assets/default-profile.png"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                            alt="Profile Image"
                        />
                    </div>

                    {/* User Information */}
                    <div className="flex flex-col space-y-2">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                        <div className="text-sm">Role: {user.role}</div>

                        {/* Email Verified */}
                        <div className="flex items-center space-x-2">
                            <span>{user.emailVerified ? "Verified" : "Not Verified"}</span>
                            {user.emailVerified && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-green-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.636 9.95a.5.5 0 01-.45-.275l-1.1-2.375a.5.5 0 01.901-.451l.649 1.404 2.799-3.7a.5.5 0 01.85.516l-3.2 4.2a.5.5 0 01-.45.281z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                            {!user.emailVerified && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-red-500"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.636 9.95a.5.5 0 01-.45-.275l-1.1-2.375a.5.5 0 01.901-.451l.649 1.404 2.799-3.7a.5.5 0 01.85.516l-3.2 4.2a.5.5 0 01-.45.281z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
