"use client"

import Form from "@/components/Form"
import Input from "@/components/Input"
import Login from "@/components/Login"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "react-toastify"

export default function LoginPage() {
    const [datas, setDatas] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const { data: session } = useSession()
    const router = useRouter()

    const handleSubmit = async (datas) => {
        await signIn("credentials", {
            redirect: false,
            email: datas?.email,
            password: datas?.password,
        }).then((response) => {
            if (!response.error) {
                router.refresh()
                router.push("/")
            } else {
                const errors = JSON.parse(response.error)
                setErrors(errors)
            }
        })
    }

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    return (
        <div className="login text-center xl:mx-[25%]">
            <h1 className="text-center text-4xl">Se connecter</h1>
            <Form handleSubmit={handleSubmit} datas={datas}>
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    required="required"
                    handleChange={(e) => handleChange(e)}
                    error={errors.email}
                />
                <Input
                    name="password"
                    type="password"
                    label="Mot de passe"
                    required="required"
                    handleChange={(e) => handleChange(e)}
                    error={errors.password}
                />
            </Form>
            <Link className="text-primary hover:text-primary-focus" href="/register">
                Pas de compte ? S&apos;inscrire.
            </Link>
            <div className="divider w-full md:w-2/3 mx-auto mb-10">OU</div>
            <button className="btn" onClick={() => signIn("google", { callbackUrl: "/" })}>
                Se connecter avec Google
            </button>
        </div>
    )
}
