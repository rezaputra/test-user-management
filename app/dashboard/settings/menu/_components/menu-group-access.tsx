"use client"
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
import { ScanEye } from "lucide-react"

export function MenuGroupAccess() {
    return (
        <Dialog>
            <Button asChild variant="ghost" size="sm">
                <DialogTrigger>
                    <ScanEye className=" size-4" />
                </DialogTrigger>
            </Button>
            <DialogContent>
                <div className="space-y-6">
                    <DialogHeader>
                        <span className=" text-lg font-semibold">Menu Access</span>{" "}
                        <span className=" text-sm text-muted-foreground">Control Menu Access by group CRUD</span>{" "}
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    )
}
