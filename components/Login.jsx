"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { useAuthContext } from "./contexts/authContext"
import { getUser } from "@/app/services/userAPI"
import { useRouter } from "next/navigation"

export default function Login() {
    const { data: session } = useSession()
    const { user, setUser } = useAuthContext()
    console.log(session)

    const fetchUser = async (id) => {
        try {
            const userData = await getUser(id)
            setUser(userData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        //session && router.push("/")
    }, [session])

    return (
        <>
            Signed in as {session?.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
            Not signed in <br />
        </>
    )
}
