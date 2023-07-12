"use client"
import Form from "@/components/Form"
import Input from "@/components/Input"
import { redirect } from "next/navigation"
import React, { useState } from "react"
import { newUser } from "../services/userAPI"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const [datas, setDatas] = useState()

    const router = useRouter()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleSubmit = async (datas) => {
        await newUser(datas)

        router.push("/")
        // useSWR("/api/products")
    }

    return (
        <div>
            <h1>S&apos;inscrire</h1>

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
        </div>
    )
}
