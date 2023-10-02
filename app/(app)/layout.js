import React, { Suspense } from "react"
import Navbar from "@/components/Navbar"
import TopBanner from "@/components/TopBanner"
import Footer from "@/components/Footer"
import Loading from "@/components/Loading"

export default function AppLayout({ children }) {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <TopBanner />
                <Navbar />
                <div className="container flex flex-col flex-grow pb-12 ">{children}</div>
                <Footer />
            </div>
        </>
    )
}
