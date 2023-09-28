import Sidebar from "@/components/admin/Sidebar"
import { Suspense } from "react"
import Loading from "@/components/Loading"

export default function AdminLayout({ children }) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen container my-16 md:space-x-5 space-y-5 md:space-y-0">
            <Sidebar />
            <div className="grow">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
        </div>
    )
}
