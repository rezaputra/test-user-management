import { Button } from "@/components/ui/button"
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
import { Component } from "lucide-react"

export function UserApplicationMenu() {
    return (
        <Dialog>
            <Button asChild variant="ghost" size="sm">
                <DialogTrigger>
                    <Component className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader className=" mb-4">
                    <span className=" text-lg font-semibold">User Menu</span>{" "}
                    <span className=" text-sm text-muted-foreground">User information for application menu access</span>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
