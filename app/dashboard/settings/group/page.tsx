import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/lib/db"
import { AddGroup } from "./_components/add-group"
import { Edit, ScanEye, Trash, Users } from "lucide-react"
import { EditGroup } from "./_components/edit-group"
import { DeleteGroup } from "./_components/delete-group"
import { UsersGroup } from "./_components/users-group"

async function GroupPage() {
    const groups = await db.group.findMany({ include: { users: true } })

    return (
        <div className="w-full space-y-4">
            <div className=" flex justify-between items-center">
                <span className=" font-semibold text-lg">Group Setting</span>
                <AddGroup />
            </div>
            <Table>
                {groups.length > 0 ? (
                    <TableCaption>A list of all groups.</TableCaption>
                ) : (
                    <TableCaption>No group provided.</TableCaption>
                )}

                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-left">Group</TableHead>
                        <TableHead className="text-center">Users</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!groups && <div>No group provided</div>}
                    {groups.map((group, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="text-center">{idx + 1}</TableCell>
                            <TableCell className="text-left">{group.name}</TableCell>
                            <TableCell className="text-center">
                                <UsersGroup users={group.users} />
                            </TableCell>
                            <TableCell className="flex space-x-2 items-center justify-center">
                                <EditGroup group={group} />
                                <DeleteGroup group={group} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default GroupPage
