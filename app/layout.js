import "./(app)/css/globals.css"
import "react-toastify/dist/ReactToastify.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers"
import { AuthContextProvider } from "@/components/contexts/authContext"
import { CartContextProvider } from "@/components/contexts/CartContext"
import { ToastContainer, Slide } from "react-toastify"

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
                            {children}
                        </CartContextProvider>
                    </AuthContextProvider>
                </body>
            </html>
        </Providers>
    )
}
