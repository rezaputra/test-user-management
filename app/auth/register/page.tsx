"use client"

import { FormRegister } from "@/components/form/form-register"
import { Suspense } from "react"

function RegisterPage() {
    return (
        <div className=" bg-slate-200 min-h-screen flex items-center justify-center">
            <Suspense>
                <FormRegister />
            </Suspense>
        </div>
    )
}

export default RegisterPage
