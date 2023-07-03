import Navbar from "@/components/Navbar"
import Searchbar from "@/components/Searchbar"
import Link from "next/link"
import React from "react"

const Home = () => {
    const name = "adrien"
    return (
        <>
            <div>
                <h1>Home</h1>
                <Searchbar />
            </div>
        </>
    )
}

export default Home
