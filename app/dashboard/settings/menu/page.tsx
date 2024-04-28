"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AddMenu } from "./_components/add-menu"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Edit, Search, Trash } from "lucide-react"
import { Application, Group, Menu, MenuAccess } from "@prisma/client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import axios from "axios"
import { MenuGroupAccess } from "./_components/menu-group-access"
import { EditMenu } from "./_components/edit-menu"
import { DeleteMenu } from "./_components/delete-menu"

interface ApplicationProps {
    data?: Application[]
    error?: boolean
    message?: string
}

interface ExtendMenuAccesses extends MenuAccess {
    group: Group
}

interface ExtendMenu extends Menu {
    application: Application
    menuAccesses: ExtendMenuAccesses[]
}

function MenuPage() {
    const [isLoadingMenu, setIsLoadingMenu] = useState<boolean>(false)
    const [applicationId, setApplicationId] = useState<string>()
    const [menus, setMenus] = useState<ExtendMenu[] | null>(null)
    const { data: applications, isLoading: isApplicationsLoading } = useSWR<ApplicationProps>(
        "/api/application",
        async (url: string) => {
            const response = await axios.get(url)
            return response.data
        }
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/menu`)
                setMenus(response.data)
            } catch (error) {
                console.error("Error fetching menus:", error)
            }
        }

        fetchData() // Call the async function immediately
    }, [])

    const handleSearch = async () => {
        setIsLoadingMenu(true)
        if (applicationId) {
            try {
                if (applicationId === "all") {
                    const response = await axios.get(`/api/menu`)
                    setMenus(response.data)
                    setIsLoadingMenu(false)
                } else {
                    const response = await axios.get(`/api/menu?applicationId=${applicationId}`)
                    setMenus(response.data)
                    setIsLoadingMenu(false)
                }
            } catch (error) {
                console.error("Error fetching menus:", error)
            }
        }
    }

    if (isApplicationsLoading) {
        return <div>Loading...</div>
    }

    if (!applications) {
        return null
    }

    return (
        <div className=" space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Select onValueChange={(value) => setApplicationId(value)}>
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="Select Application" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Applications</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                {applications?.data?.map((application, idx) => (
                                    <SelectItem key={idx} value={application.id}>
                                        {application.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button size="icon" onClick={handleSearch}>
                        <Search className="size-4" />
                    </Button>
                </div>
                <AddMenu applications={applications.data as Application[]} />
            </div>
            {isLoadingMenu ? (
                <div>Loading...</div>
            ) : (
                <Table>
                    <TableCaption>A list of all menu.</TableCaption>
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
                        {/* {!menus && <div>No menu provided</div>} */}
                        {menus?.map((menu, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell className="text-left">{menu.name}</TableCell>
                                <TableCell className="text-left">{menu.application.name}</TableCell>
                                {/* <TableCell className="text-left">{menu.menuAccess.group.id}</TableCell> */}
                                <TableCell className="text-center">
                                    <MenuGroupAccess menuAccesses={menu.menuAccesses} />
                                </TableCell>
                                <TableCell className="flex space-x-2 items-center justify-center">
                                    <EditMenu menu={menu} />
                                    <DeleteMenu menu={menu} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

export default MenuPage
