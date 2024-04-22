import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google"

const font = Inter({
    weight: "400",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Test user management",
    description: "Develop by reza",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Toaster />
            <SessionProvider>
                <body className={cn("min-h-screen bg-background antialiased", font.className)}>{children}</body>
            </SessionProvider>
        </html>
    )
}
