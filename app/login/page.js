"use client"

import Form from "@/components/Form"
import Input from "@/components/Input"
import Login from "@/components/Login"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function LoginPage() {
    const [datas, setDatas] = useState()
    const { data: session } = useSession()
    const router = useRouter()

    const handleSubmit = async (datas) => {
        await signIn("credentials", {
            redirect: false,
            email: datas.email,
            password: datas.password,
        })
        router.push("/")
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
            <Login />
            <Form handleSubmit={handleSubmit} datas={datas}>
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    required="required"
                    handleChange={(e) => handleChange(e)}
                />
                <Input
                    name="password"
                    type="password"
                    minLength="4"
                    label="Mot de passe"
                    required="required"
                    handleChange={(e) => handleChange(e)}
                />
            </Form>
            <div className="divider w-full md:w-2/3 mx-auto mb-10">OU</div>
            <button
                className="btn"
                onClick={() => signIn("google", { callbackUrl: "/" })}
            >
                Se connecter avec Google
            </button>
        </div>
    )
}
