import Link from "next/link"
import React from "react"

export default function Sidebar() {
    return (
        <div>
            <ul className="menu w-56 bg-white shadow-sm rounded-box">
                <h1 className="h2 pl-4 py-1">Admin</h1>
                <li>
                    <Link href="/admin/categories">Catégories</Link>
                </li>
                <li>
                    <Link href="/admin/products">Produits</Link>
                </li>
                <li>
                    <Link href="/admin/orders">Commandes</Link>
                </li>
            </ul>
            <ul className="menu w-56 bg-white shadow-sm rounded-box p0 mt-3">
                <li>
                    <Link href="/" target="_blank">
                        Retour sur l&apos;application
                    </Link>
                </li>
            </ul>
        </div>
    )
}
