"use client"

import FormWrapper from "./form-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { FormSuccess } from "../form/form-success"
import { FormError } from "../form/form-error"
import { Input } from "../ui/input"

import { RegisterSchema } from "@/schemas/auth"
import { register } from "@/actions/register"

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export function FormRegister() {
    const [success, setSuccess] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setSuccess(undefined)
        setError(undefined)

        startTransition(async () => {
            const { error, success } = await register(values)
            form.reset()

            setSuccess(success)
            setError(error)
        })
    }

    return (
        <div className=" w-96">
            <FormWrapper
                title="Sign Up"
                description="Create an account"
                showSocial={true}
                backButtonLabel="Already have an account ?"
                backButtonHref="/"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder="john Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                </FormItem>
                            )}
                        />

                        <FormSuccess message={success!} />
                        <FormError message={error!} />

                        <Button disabled={isPending} type="submit" className=" w-full">
                            Create an account
                        </Button>
                    </form>
                </Form>
            </FormWrapper>
        </div>
    )
}
