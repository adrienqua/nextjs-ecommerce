import React, { Suspense } from "react"
import AdminSidebar from "@/components/admin/AdminSidebar"
import Loading from "@/components/Loading"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions)
    if (!session || session?.user?.role !== "ADMIN") {
        redirect("/")
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen container my-16 lg:space-x-5 space-y-5 lg:space-y-0">
            <AdminSidebar />
            <div className="grow">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
        </div>
    )
}
