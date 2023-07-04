import Link from "next/link"
import React from "react"
import Categories from "./../../app/categories/page"

export default function Sidebar() {
    return (
        <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button lg:hidden"
                >
                    Open drawer
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                        <Link href="/admin/products">Produits</Link>
                    </li>
                    <li>
                        <Link href="/admin/categories">Catégories</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
