import { FormLogin } from "@/components/form/form-login"
import { Suspense } from "react"

export default function Home() {
    return (
        <div className=" bg-slate-200 min-h-screen flex items-center justify-center">
            <Suspense>
                <FormLogin />
            </Suspense>
        </div>
    )
}
