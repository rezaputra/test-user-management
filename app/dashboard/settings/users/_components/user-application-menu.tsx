import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Group, Menu, MenuAccess } from "@prisma/client"
import { Component } from "lucide-react"
import { space } from "postcss/lib/list"

interface ExtendMenuAccess extends MenuAccess {
    menu: Menu
}

interface ExtendGroupAccess extends Group {
    menuAccesses: ExtendMenuAccess[]
}

interface UserApplicationMenuProps {
    role: string
    group: ExtendGroupAccess | null
}

export function UserApplicationMenu({ role, group }: UserApplicationMenuProps) {
    return (
        <Dialog>
            <Button asChild variant="ghost" size="sm">
                <DialogTrigger>
                    <Component className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-4">
                    <DialogHeader className="mb-4">
                        <span className="text-lg font-semibold">User Menu</span>{" "}
                        <span className="text-sm text-muted-foreground">
                            User information for application menu access
                        </span>
                    </DialogHeader>

                    {role === "ADMIN" ? (
                        <span>Admin can access all menu</span>
                    ) : (
                        <Table>
                            <TableCaption>A list of all menus.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-left">Menu</TableHead>
                                    <TableHead className="text-center">Create</TableHead>
                                    <TableHead className="text-center">Read</TableHead>
                                    <TableHead className="text-center">Update</TableHead>
                                    <TableHead className="text-center">Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {group ? (
                                    group.menuAccesses.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No menu provided
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        group.menuAccesses.map((access, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="text-left">{access.menu.name}</TableCell>
                                                <TableCell className="text-center">
                                                    <Checkbox checked={access.canCreate} disabled={true} />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Checkbox checked={access.canRead} disabled={true} />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Checkbox checked={access.canUpdate} disabled={true} />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Checkbox checked={access.canDelete} disabled={true} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            No group provided
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
