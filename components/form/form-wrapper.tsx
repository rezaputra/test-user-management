"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Social } from "./social"

interface FormWrapperProps {
    title: string
    description?: string
    children: React.ReactNode
    showSocial?: boolean
    backButtonLabel?: string
    backButtonHref?: string
}

function FormWrapper({ title, description, children, showSocial, backButtonLabel, backButtonHref }: FormWrapperProps) {
    return (
        <>
            <Card className="p-4">
                <CardHeader>
                    <CardTitle className=" text-center">{title}</CardTitle>
                    <CardDescription className=" text-center">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className=" space-y-6">
                        {children}
                        {showSocial && <Social />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="sm" variant="link" className=" w-full" asChild>
                        <Link href={backButtonHref!}>{backButtonLabel}</Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default FormWrapper
