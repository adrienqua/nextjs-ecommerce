"use client"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { redirect } from "next/navigation"
import React, { useState } from "react"
import { newUser } from "../services/userAPI"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { formatErrors } from "@/utils/formatErrors"

export default function RegisterPage() {
    const [datas, setDatas] = useState()
    const [errors, setErrors] = useState()

    const router = useRouter()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleSubmit = async (datas) => {
        try {
            await newUser(datas)
            await signIn("credentials", {
                redirect: false,
                email: datas?.email,
                password: datas?.password,
            })
            router.push("/")
        } catch (error) {
            setErrors(formatErrors(error))
        }

        // useSWR("/api/products")
    }

    return (
        <div className="register text-center xl:mx-[25%]">
            <h1 className="text-center text-4xl">S&apos;inscrire</h1>

            <Form handleSubmit={handleSubmit} datas={datas}>
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    required="required"
                    handleChange={(e) => handleChange(e)}
                    error={errors?.email}
                />
                <Input
                    name="password"
                    type="password"
                    minLength="4"
                    label="Mot de passe"
                    required="required"
                    handleChange={(e) => handleChange(e)}
                    error={errors?.password}
                />
            </Form>

            <Link
                className="text-primary hover:text-primary-focus"
                href="/login"
            >
                Vous avez déjà un compte ? Se connecter
            </Link>
        </div>
    )
}
