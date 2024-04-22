"use client"

import { FormError } from "../form/form-error"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import FormWrapper from "./form-wrapper"

import { login } from "@/actions/login"
import { LoginSchema } from "@/schemas/auth"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export function FormLogin() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const [error, setError] = useState<string | undefined>(undefined)
    const [success, setSuccess] = useState<string | undefined>(undefined)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setSuccess(undefined)
        setError(undefined)

        startTransition(async () => {
            const res = await login(values, callbackUrl)
            form.reset()

            if (res?.error) setError(res.error)
            if (res?.redirect) {
                router.push(res?.redirect)
            }
        })
    }

    return (
        <div className=" w-96">
            <FormWrapper
                title="Sign In"
                description="Welcome back"
                showSocial={true}
                backButtonLabel="Not have account ?"
                backButtonHref="/auth/register"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="email"
                                            placeholder="example@mail.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type="password" placeholder="******" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    <Button size="sm" variant="link" className="px-0 font-normal">
                                        <Link href={"/auth/reset"}>Forgot password ?</Link>
                                    </Button>
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />

                        <div>
                            <Button disabled={isPending} type="submit" className=" w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>
            </FormWrapper>
        </div>
    )
}
