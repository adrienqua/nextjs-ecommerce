import Navbar from "@/components/Navbar"
import TopBanner from "@/components/TopBanner"
import "./css/globals.css"
import "react-toastify/dist/ReactToastify.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers"
import Head from "next/head"
import { AuthContextProvider } from "@/components/contexts/authContext"
import { CartContextProvider } from "@/components/contexts/CartContext"
import { ToastContainer, Slide } from "react-toastify"
import Footer from "@/components/Footer"

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBanner />
            <Navbar />
            <div className="container h-100">{children}</div>
            <Footer />
        </div>
    )
}
