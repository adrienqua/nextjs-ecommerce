"use client"
import React, { useEffect, useState } from "react"

import AccountAddressesItem from "./AccountAddressesItem"
import Modal from "../Modal"
import Form from "../Form"
import Input from "../Input"
import { newAddress } from "@/app/services/addressAPI"
import { useRouter } from "next/navigation"
import { formatErrors } from "@/utils/formatErrors"
import { toast } from "react-toastify"
import ProductListItem from "../products/ProductListItem"

export default function AccountFavorites({ favorites, user }) {
    return (
        <>
            <div id="account-favorites" className="flex-1 lg:mx-5 bg-white p-5 shadow-sm rounded-2xl">
                <h2 className="h2 mb-3">Mes favoris</h2>
                {favorites.length > 0 ? (
                    <div
                        id="products"
                        className="grid grid-cols-2 gap-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 mt-5 mb-8"
                    >
                        {favorites.map((product) => (
                            <ProductListItem key={product.id} product={product} user={user} favorite={true} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Vous n&apos;avez pas de favoris enregistrés.</p>
                )}
            </div>
        </>
    )
}
