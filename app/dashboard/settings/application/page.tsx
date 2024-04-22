import { AddApplication } from "./_components/add-application"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/lib/db"
import { ScanEye } from "lucide-react"
import Link from "next/link"
import { AccessApplication } from "./_components/access-application"
import { EditApplication } from "./_components/edit-application"
import { DeleteApplication } from "./_components/delete-application"

async function ApplicationPage() {
    const applications = await db.application.findMany({
        include: { groupApplications: true },
        orderBy: [
            {
                order: "asc", // Order by the 'order' field in ascending order
            },
            // You can add more fields to order by here
        ],
    })
    const groups = await db.group.findMany()

    return (
        <div className="w-full space-y-4">
            <div className=" flex justify-between items-center">
                <span className=" font-semibold text-lg">Application Setting</span>
                <AddApplication />
            </div>
            <Table>
                {applications.length > 0 ? (
                    <TableCaption>A list of all application.</TableCaption>
                ) : (
                    <TableCaption>No application provided.</TableCaption>
                )}

                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Order</TableHead>
                        <TableHead className="text-left">Application</TableHead>
                        <TableHead className="text-center">Access</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!applications && <div>No group provided</div>}
                    {applications.map((application, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="text-left">{application.order}</TableCell>
                            <TableCell className="text-left">{application.name}</TableCell>
                            <TableCell className="text-center">
                                <AccessApplication
                                    application={application}
                                    appGroupIds={application.groupApplications.map((ag) => ag.groupId)}
                                    groups={groups}
                                />
                            </TableCell>
                            <TableCell className="flex space-x-2 items-center justify-center">
                                <EditApplication application={application} />
                                <DeleteApplication application={application} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicationPage
