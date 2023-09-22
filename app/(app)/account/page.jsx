import React from "react"

import { getUser } from "../../services/userAPI"
import AccountSidebar from "@/components/account/AccountSidebar"
import ListingTable from "@/components/admin/ListingTable"
import AccountInformations from "@/components/account/AccountInformations"
import AccountAddresses from "@/components/account/AccountAddresses"
import { getServerSession } from "next-auth"
import { GET } from "../api/auth/[...nextauth]/route"
import Modal from "@/components/Modal"
import Form from "@/components/Form"
import Input from "@/components/Input"

const fetchUser = async (id) => {
    "use server"
    const datas = await getUser(id)
    return datas
}

export default async function AccountPage() {
    const session = await getServerSession(GET)
    const user = await fetchUser(session.user.email)
    console.log(session)

    const ordersHeaderDatas = [
        { label: "Commande", value: "orderNumber" },
        { label: "Total", value: "total", type: "price" },
        { label: "Statut", value: "status" },
        { label: "", value: "details", action: "details" },
    ]

    const ordersDetailsDatas = [
        { label: "Commande", value: "orderNumber" },
        { label: "Statut", value: "status" },
        { label: "Client", value: "user.email" },
        { label: "Adresse", value: "address" },

        {
            label: "Contenu de la commande",
            value: "orderItems",
            orderItems: ["quantity", "product", "color", "size", "price"],
        },
        { label: "Transporteur", value: "carrierName" },
        { label: "Sous total", value: "subTotal", format: "price" },
        { label: "Frais de port", value: "carrierPrice", format: "price" },
        { label: "Total", value: "total", format: "price" },
    ]

    return (
        <div className="account">
            <h1 className="h1 pl-6 mb-3">Mon compte</h1>
            <div className="flex">
                <AccountSidebar />
                <div id="account-orders" className="flex flex-col flex-1 space-y-5">
                    <div className="flex-1 mx-5 bg-white p-5 shadow-sm rounded-2xl">
                        <h2 className="h2 text-center">Mes commandes</h2>
                        {user && (
                            <ListingTable
                                datas={user.orders}
                                headerDatas={ordersHeaderDatas}
                                detailsDatas={ordersDetailsDatas}
                            />
                        )}
                    </div>

                    <AccountAddresses addresses={user.addresses} userId={user.id} />

                    <AccountInformations user={user} />
                </div>
            </div>
        </div>
    )
}
