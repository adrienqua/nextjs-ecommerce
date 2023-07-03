import Form from "@/components/Form"
import Input from "@/components/Input"
import { hash } from "bcrypt"
import { redirect } from "next/navigation"
import React from "react"
import { newUser } from "../services/userAPI"

export default function RegisterPage() {
    const handleSubmit = async (datas) => {
        "use server"

        await newUser({
            email: datas.get("email"),
            password: datas.get("password"),
        })

        redirect("/")
        // useSWR("/api/products")
    }

    return (
        <div>
            <h1>S&apos;inscrire</h1>

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
        </div>
    )
}
