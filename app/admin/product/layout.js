import "../../css/globals.css"
import { AuthContextProvider } from "@/components/contexts/authContext"

export default function AdminLayout({ children }) {
    return (
        <div className="container h-100">
            <AuthContextProvider>{children}</AuthContextProvider>
        </div>
    )
}
