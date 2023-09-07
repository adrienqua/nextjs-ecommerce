"use client"
import React from "react"
import { signOut, useSession } from "next-auth/react"

import { useAuthContext } from "@/components/contexts/authContext"

export default function AccountPage() {
    const { data: session } = useSession()
    console.log(session)

    return (
        <div className="account text-center">
            <h1 className="h1">Mon compte</h1>
            <h2>{session?.user?.email}</h2>
            <button
                className="btn btn-sm"
                onClick={() => signOut({ callbackUrl: "/login" })}
            >
                Se déconnecter
            </button>
        </div>
    )
}
