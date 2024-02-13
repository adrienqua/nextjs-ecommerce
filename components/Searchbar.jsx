"use client"
import React, { useState } from "react"
import Input from "./Input"
import { useRouter } from "next/navigation"

export default function Searchbar({ closeRef }) {
    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (closeRef) {
            closeRef.current.click()
        }
        router.push(`/search?q=${query}`)
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                className="input input-bordered input-md h-10 text-black"
                type="search"
                placeholder="Rechercher un produit"
                onChange={(e) => handleChange(e)}
            />
        </form>
    )
}
