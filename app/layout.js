import "./(app)/css/globals.css"
import "react-toastify/dist/ReactToastify.css"
import { Inter } from "next/font/google"
import Providers from "@/components/Providers"
import { AuthContextProvider } from "@/components/contexts/authContext"
import { CartContextProvider } from "@/components/contexts/CartContext"
import { ToastContainer, Slide } from "react-toastify"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Next.js e-commerce",
    description: "Une application e-commerce fullstack créée par Adrien Quacchia.",
}

export default function RootLayout({ children }) {
    return (
        <Providers>
            <html lang="fr" className="overflow-x-hidden">
                <head>
                    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4PER2W73DB"></Script>
                    <Script id="google-analytics">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-4PER2W73DB');
                        `}
                    </Script>
                </head>
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
