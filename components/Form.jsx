"use client"

import React, { useEffect, useState, useTransition } from "react"
import Input from "./Input"
import useSWR from "swr"
import { newProduct } from "@/app/services/productAPI"
import { useAuthContext } from "./contexts/authContext"
import { useSession, signIn, signOut } from "next-auth/react"
import { revalidatePath } from "next/cache"

export default function Form({ children, handleSubmit }) {
    const { data: session, status } = useSession()
    const [datas, setDatas] = useState({})
    const { user, setUser } = useAuthContext()
    let [isPending, startTransition] = useTransition()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const fetchDatas = async (url) => {
        return await fetch(url).then((res) => res.json())
    }

    return (
        <form
            className="flex flex-col items-center mb-16"
            /* onSubmit={async (e) => {
                    await handleSubmit(e)
                }} */
            action={handleSubmit}
            method="POST"
        >
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, { onChange: handleChange })
            })}
            <button type="submit" className="btn btn-primary  mt-4">
                Confirmer
            </button>
        </form>
    )
}
