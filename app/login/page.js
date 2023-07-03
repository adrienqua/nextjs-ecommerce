"use client"

import Form from "@/components/Form"
import Input from "@/components/Input"
import Login from "@/components/Login"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function LoginPage() {
    const { data: session } = useSession()

    const handleSubmit = async (datas) => {
        await signIn("credentials", {
            email: datas.get("email"),
            password: datas.get("password"),
        })
    }

    return (
        <div className="login text-center">
            <h1 className="text-center text-4xl">Se connecter</h1>
            <Login />
            <Form handleSubmit={handleSubmit}>
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    required="required"
                />
                <Input
                    name="password"
                    type="password"
                    minLength="4"
                    label="Mot de passe"
                    required="required"
                />
            </Form>
            <div className="divider w-full md:w-2/3 mx-auto">OR</div>
            <button
                className="btn"
                onClick={() =>
                    signIn("credentials", {
                        email: "adrienqua@gmail.com",
                        password: "test",
                    })
                }
            >
                Se connecter avec Google
            </button>
            <button
                className="btn"
                onClick={() =>
                    signIn("credentials", {
                        email: "test@test.com",
                        password: "test",
                    })
                }
            >
                Se connecter avec Google
            </button>
        </div>
    )
}
