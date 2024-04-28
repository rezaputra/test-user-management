import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-4xl font-bold mb-4">Oops!</h2>
            <p className="text-lg mb-8">We couldn&apos;t find the page you&apos;re looking for.</p>
            <Link href="/dashboard" passHref>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
