"use client"
import React from "react"
import { signOut } from "next-auth/react"

import { useAuthContext } from "@/components/contexts/authContext"

export default function AccountPage() {
    return (
        <div className="account text-center">
            <h1 className="h1">Mon compte</h1>
            <button className="btn btn-sm" onClick={() => signOut()}>
                Se déconnecter
            </button>
        </div>
    )
}
