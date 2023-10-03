import React from "react"

import { getUser } from "../../services/userAPI"
import AccountSidebar from "@/components/account/AccountSidebar"
import ListingTable from "@/components/admin/ListingTable"
import AccountInformations from "@/components/account/AccountInformations"
import AccountAddresses from "@/components/account/AccountAddresses"
import { getServerSession } from "next-auth"
import Modal from "@/components/Modal"
import Form from "@/components/Form"
import Input from "@/components/Input"
import AccountOrders from "@/components/account/AccountOrders"
import { authOptions } from "@/app/lib/auth"
import AccountFavorites from "@/components/account/AccountFavorites"
import { fetchFavoritesProducts } from "@/components/actions/fetchProducts"

const fetchUser = async (id) => {
    "use server"
    const datas = await getUser(id)
    return datas
}

export default async function AccountPage() {
    const session = await getServerSession(authOptions)
    const user = await fetchUser(session.user.email)
    const favorites = await fetchFavoritesProducts(session.user.id)
    console.log(session)

    return (
        <div className="account">
            <h1 className="h1 pl-6 mb-3">Mon compte</h1>
            <div className="flex flex-col lg:flex-row ">
                <AccountSidebar />
                <div className="flex flex-col flex-1 space-y-5">
                    <AccountOrders user={user} />

                    <AccountAddresses addresses={user.addresses} userId={user.id} />

                    <AccountFavorites favorites={favorites} user={user} />

                    <AccountInformations user={user} />
                </div>
            </div>
        </div>
    )
}
