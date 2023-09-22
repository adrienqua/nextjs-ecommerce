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

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Next.js e-commerce",
    description: "A fullstack e-commerce application created by Adrien Quacchia.",
}

export default function RootLayout({ children }) {
    return (
        <Providers>
            <html lang="fr" className="overflow-x-hidden">
                <body className={`${inter.className} min-h-screen`} suppressHydrationWarning>
                    <AuthContextProvider>
                        <CartContextProvider>
                            <ToastContainer hideProgressBar={true} transition={Slide} autoClose={2500} />
                            <div className="min-h-screen flex flex-col">
                                <TopBanner />
                                <Navbar />
                                <div className="container h-100">{children}</div>
                                <Footer />
                            </div>
                        </CartContextProvider>
                    </AuthContextProvider>
                </body>
            </html>
        </Providers>
    )
}
