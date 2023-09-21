"use client"
import React from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default function AccountSidebar() {
    return (
        <div>
            <ul className="menu w-56 bg-white shadow-sm rounded-box">
                <li>
                    <label htmlFor={`user-informations`}>
                        Mes informations
                    </label>
                </li>
                <li>
                    <Link href="#account-orders">Mes commandes</Link>
                </li>
                <li>
                    <Link href="#account-addresses">Mes adresses</Link>
                </li>
            </ul>
            <ul className="menu w-56 bg-white shadow-sm rounded-box p0 mt-3">
                <li>
                    <button onClick={() => signOut({ callbackUrl: "/login" })}>
                        Se déconnecter
                    </button>
                </li>
            </ul>
        </div>
    )
}