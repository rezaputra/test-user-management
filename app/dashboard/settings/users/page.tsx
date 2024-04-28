import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Component, Edit, Plus, Trash } from "lucide-react"
import { currentUser } from "@/hooks/current-user"
import { db } from "@/lib/db"
import { UserDetail } from "./_components/user-details"
import { ChangeRole } from "./_components/change-role"
import { ChangeGroup } from "./_components/change-group"
import { EditUser } from "./_components/edit-user"
import { DeleteUser } from "./_components/delete-user"
import { Group } from "@prisma/client"
import { UserApplicationMenu } from "./_components/user-application-menu"

async function UsersPage() {
    const users = await db.user.findMany({
        include: {
            group: { include: { menuAccesses: { include: { menu: true } } } },
        },
    })

    const groups = await db.group.findMany()

    return (
        <div className=" w-full space-y-4">
            <div className="  font-semibold">All users</div>
            <Table>
                <TableCaption>A list of all users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-left">Email</TableHead>
                        <TableHead className="text-center">Admin</TableHead>
                        <TableHead className="text-center">Group</TableHead>
                        <TableHead className="text-center">Menu</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="text-center">{idx + 1}</TableCell>
                            <TableCell className=" text-left">
                                <UserDetail user={user} />
                            </TableCell>
                            <TableCell className=" text-center">
                                <ChangeRole userId={user.id} isAdmin={user.role === "ADMIN"} />
                            </TableCell>
                            <TableCell className="text-center">
                                <ChangeGroup groups={groups} userGroup={user.group as Group} user={user} />
                            </TableCell>
                            <TableCell className=" text-center">
                                <UserApplicationMenu group={user.group as any} role={user.role as string} />
                            </TableCell>
                            <TableCell className="  w-full flex space-x-2 items-center justify-center">
                                <EditUser user={user} />
                                <DeleteUser userId={user.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default UsersPage
