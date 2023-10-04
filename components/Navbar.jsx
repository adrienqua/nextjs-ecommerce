"use client"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { useCartContext } from "./contexts/CartContext"
import { useSession } from "next-auth/react"
import Searchbar from "./Searchbar"

export default function Navbar() {
    const [mobileToggle, setMobileToggle] = useState(false)
    const { cartProducts } = useCartContext()
    const { data: session } = useSession()
    const mobileRef = useRef(null)
    const closeMobileRef = useRef(null)

    const handleMobileMenu = () => {
        mobileRef.current.click()
    }

    const handleCloseMenu = () => {
        closeMobileRef.current.click()
    }

    return (
        <div className="nav mb-8 text-white bg-slate-900 py-3 px-6 sticky top-0 z-40 ">
            <div className="flex flex-row justify-between items-center ">
                <div className="flex">
                    <button
                        className="mobile-toggle inline-block align-bottom md:hidden"
                        onClick={() => handleMobileMenu()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                    <Link className="p-2" href="/">
                        Logo
                    </Link>

                    <div className="hidden md:flex space-x-2">
                        <Link className="p-2 hover:bg-slate-700 rounded-lg" href="/products">
                            Produits
                        </Link>
                        <div className="group relative inline-block">
                            <Link className="p-2  hover:bg-slate-700 rounded-lg inline-block" href="/categories">
                                Catégories
                            </Link>
                            <div className="hidden group-hover:block absolute">
                                <ul className=" bg-slate-800 flex flex-col py-1.5 mt-1.5 w-52 left-0 rounded-lg cursor-pointer shadow-sm backdrop-blur-sm bg-opacity-90">
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100">
                                        <Link className="block px-4 py-3 " href="/categories/t-shirts">
                                            T-shirts
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100">
                                        <Link className="block px-4 py-3 " href="/categories/chemises">
                                            Chemises
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100">
                                        <Link className="block px-4 py-3 " href="/categories/pulls">
                                            Pulls
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100">
                                        <Link className="block px-4 py-3 " href="/categories/pantalons">
                                            Pantalons
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100">
                                        <Link className="block px-4 py-3 " href="/categories/shorts">
                                            Shorts
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-1">
                    <div className="hidden md:block">
                        <Searchbar />
                    </div>
                    <Link className="p-2 hover:bg-slate-700 rounded-lg relative" href="/cart">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 inline-block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>

                        <span className="absolute bottom-[2px] right-0 badge badge-primary badge-xs py-2">
                            {cartProducts ? cartProducts.length : 0}
                        </span>
                    </Link>
                    <Link className="p-2 hover:bg-slate-700 rounded-lg" href={!session?.user ? "/login" : "/account"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 inline-block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg>
                        {session?.user && (
                            <span className="hidden md:inline-block">
                                <small>{session.user.name}</small>
                            </span>
                        )}
                    </Link>
                </div>
            </div>
            <div className="drawer">
                <input id="mobile-menu" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label ref={mobileRef} htmlFor="mobile-menu" className="hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        ref={closeMobileRef}
                        htmlFor="mobile-menu"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-5 w-80 min-h-full bg-slate-900 bg-opacity-90 backdrop-blur-sm  text-white ">
                        <span className="mb-3 mt-1">
                            <Searchbar closeRef={closeMobileRef} />
                        </span>
                        <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100 rounded-lg">
                            <Link className="block px-4 py-3 hover:text-white focus:!text-white" href="/products">
                                Produits
                            </Link>
                        </li>
                        <li>
                            <details open>
                                <summary className="text-sm hover:bg-slate-600 hover:bg-opacity-100 rounded-lg px-4 py-3 hover:text-white focus:!text-white ">
                                    Catégories
                                </summary>
                                <ul>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100 rounded-lg">
                                        <Link
                                            className="block px-4 py-3 hover:text-white focus:!text-white"
                                            href="/categories/t-shirts"
                                            onClick={() => handleCloseMenu()}
                                        >
                                            T-shirts
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100 rounded-lg">
                                        <Link
                                            className="block px-4 py-3 hover:text-white focus:!text-white"
                                            href="/categories/chemises"
                                            onClick={() => handleCloseMenu()}
                                        >
                                            Chemises
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100 rounded-lg">
                                        <Link
                                            className="block px-4 py-3 hover:text-white focus:!text-white"
                                            href="/categories/pulls"
                                            onClick={() => handleCloseMenu()}
                                        >
                                            Pulls
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100 rounded-lg">
                                        <Link
                                            className="block px-4 py-3 hover:text-white focus:!text-white"
                                            href="/categories/pantalons"
                                            onClick={() => handleCloseMenu()}
                                        >
                                            Pantalons
                                        </Link>
                                    </li>
                                    <li className="text-sm hover:bg-slate-600 hover:bg-opacity-100 rounded-lg">
                                        <Link
                                            className="block px-4 py-3 hover:text-white focus:!text-white"
                                            href="/categories/shorts"
                                            onClick={() => handleCloseMenu()}
                                        >
                                            Shorts
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
