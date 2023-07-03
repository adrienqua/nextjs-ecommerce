"use client"
import React, { useState } from "react"
import Input from "./Input"
import { useRouter } from "next/navigation"

export default function Searchbar() {
    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/search?q=${query}`)
    }

    return (
        <div className="join my-5 flex items-center">
            <form onSubmit={handleSearch}>
                <input
                    className="input input-bordered input-md join-item"
                    type="search"
                    placeholder="Rechercher un produit"
                    onChange={(e) => handleChange(e)}
                />
                <button className="btn join-item rounded-r-full">
                    Rechercher
                </button>
            </form>
        </div>
    )
}
