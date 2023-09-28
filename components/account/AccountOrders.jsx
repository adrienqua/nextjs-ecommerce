import React from "react"
import ListingTable from "../admin/ListingTable"

export default function AccountOrders({ user }) {
    const ordersHeaderDatas = [
        { label: "Commande", value: "orderNumber" },
        { label: "Total", value: "total", type: "price" },
        { label: "Statut", value: "status", type: "badge" },
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
        <div id="account-orders" className="flex-1 md:mx-5 bg-white p-5 shadow-sm rounded-2xl">
            <h2 className="h2 text-center mb-3">Mes commandes</h2>
            {user &&
                (user.orders.length > 0 ? (
                    <ListingTable
                        datas={user.orders}
                        headerDatas={ordersHeaderDatas}
                        detailsDatas={ordersDetailsDatas}
                    />
                ) : (
                    <p className="text-gray-500 text-center">Vous n&apos;avez pas encore effectué de commande.</p>
                ))}
        </div>
    )
}
