import { db } from "@/lib/db"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddMenu } from "./_components/add-menu"
import { Edit, Eye, Trash } from "lucide-react"
import { MenuGroupAccess } from "./_components/menu-group-access"
import { Button } from "@/components/ui/button"

async function MenuPage() {
    const menus = await db.menu.findMany({ include: { application: true } })
    const applications = await db.application.findMany()

    return (
        <div className="w-full space-y-4">
            <div className=" flex justify-between items-center">
                <span className=" font-semibold text-lg">Menu Setting</span>
                <AddMenu applications={applications} />
            </div>
            <Table>
                {menus.length > 0 ? (
                    <TableCaption>A list of all menu.</TableCaption>
                ) : (
                    <TableCaption>No menus provided.</TableCaption>
                )}

                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-left">Menu</TableHead>
                        <TableHead className="text-left">Application</TableHead>
                        <TableHead className="text-center">Access</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!menus && <div>No menu provided</div>}
                    {menus.map((menu, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="text-center">{idx + 1}</TableCell>
                            <TableCell className="text-left">{menu.name}</TableCell>
                            <TableCell className="text-left">{menu.application?.name}</TableCell>
                            <TableCell className="text-center">
                                <MenuGroupAccess />
                            </TableCell>
                            <TableCell className="flex space-x-2 items-center justify-center">
                                <Button size="sm">
                                    <Edit className="size-4" />
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <Trash className="size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default MenuPage
