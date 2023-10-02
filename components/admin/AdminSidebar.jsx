import Link from "next/link"
import React from "react"

export default function AdminSidebar() {
    return (
        <div>
            <ul className="menu w-full lg:w-56 bg-white shadow-sm rounded-box">
                <h1 className="h2 pl-4 py-1">Admin</h1>
                <li>
                    <Link href="/admin/categories">Catégories</Link>
                </li>
                <li>
                    <Link href="/admin/products">Produits</Link>
                </li>
                <li>
                    <details open>
                        <summary>Attributs</summary>
                        <ul>
                            <li>
                                <Link href="/admin/colors">Couleurs</Link>
                            </li>
                            <li>
                                <Link href="/admin/sizes">Tailles</Link>
                            </li>
                        </ul>
                    </details>
                </li>
                <li>
                    <Link href="/admin/orders">Commandes</Link>
                </li>
                <li>
                    <Link href="/admin/discounts">Codes promo</Link>
                </li>
                <li>
                    <Link href="/admin/users">Utilisateurs</Link>
                </li>
            </ul>
            <ul className="menu w-full lg:w-56 bg-white shadow-sm rounded-box p0 mt-3">
                <li>
                    <Link href="/" target="_blank">
                        Retour sur l&apos;application
                    </Link>
                </li>
            </ul>
        </div>
    )
}
