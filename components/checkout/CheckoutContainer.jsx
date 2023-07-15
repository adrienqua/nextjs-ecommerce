"use client"

import { getCart } from "@/app/services/cartAPI"
import { useCartContext } from "@/components/contexts/CartContext"
import React, { useEffect, useState } from "react"
import Order from "./Order"
import Cart from "./Cart"
import Address from "./Address"
import { useSession } from "next-auth/react"
import { newAddress } from "@/app/services/addressAPI"
import { getUserAddresses } from "@/app/services/userAPI"
import Carrier from "./Carrier"
import { getCarriers } from "@/app/services/carrierAPI"
import { formatPrice } from "@/utils/formatPrice"
import { newOrder } from "@/app/services/checkoutAPI"

export default function CheckoutContainer({ children }) {
    const [products, setProducts] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [addressFormDatas, setAddressFormDatas] = useState({
        label: "Maison",
        country: "France",
    })
    const [addresses, setAddresses] = useState([])
    const [carriers, setCarriers] = useState([])
    const [selectedAddress, setSelectedAddress] = useState({})
    const [selectedCarrier, setSelectedCarrier] = useState({})
    const [isOrderFilled, setIsOrderFilled] = useState(false)
    const { data: session } = useSession()

    const { cartProducts, handleAddToCart, handleSubstractToCart } =
        useCartContext()

    //Cart
    const fetchCart = async () => {
        setProducts(
            await getCart(cartProducts).then((res) => {
                const datas = res.data
                let subtotal = 0
                datas.map((data) => {
                    data.quantity = cartProducts?.filter(
                        (id) => id === data.id
                    ).length
                    subtotal += data.price * data.quantity
                })
                setSubTotal(subtotal)

                return datas
            })
        )
    }

    const handleIncrement = (id) => {
        handleAddToCart(id)
    }

    const handleDecrement = (id) => {
        handleSubstractToCart(id)
    }

    useEffect(() => {
        cartProducts?.length > 0 && fetchCart()
    }, [cartProducts])

    useEffect(() => {
        subTotal > 60
            ? setShipping(0)
            : Object.keys(selectedCarrier).length > 0 &&
              setShipping(parseFloat(selectedCarrier.price))
    }, [subTotal, selectedCarrier])

    //Address
    const fetchAddresses = async () => {
        setAddresses(await getUserAddresses(session.user.id))
    }

    const handleSubmit = async (datas) => {
        await newAddress({
            label: datas.label,
            name: datas.name,
            phone: datas.phone,
            address: datas.address,
            postalCode: datas.postalCode,
            city: datas.city,
            country: datas.country,
            userId: session.user.id,
        })
        fetchAddresses()
    }

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setAddressFormDatas({ ...addressFormDatas, [e.target.name]: value })
    }

    const handleAddressChange = (e) => {
        let id = parseInt(e.target.id)
        const cloneAddresses = [...addresses]
        const [result] = cloneAddresses.filter((address) => address.id === id)
        setSelectedAddress(result)
    }

    const handleCarrierChange = (e) => {
        let id = parseInt(e.target.id)
        const cloneCarriers = [...carriers]
        const [result] = cloneCarriers.filter((carrier) => carrier.id === id)
        setSelectedCarrier(result)
    }

    useEffect(() => {
        session && fetchAddresses()
    }, [session])

    //carrier
    const fetchCarriers = async () => {
        setCarriers(await getCarriers())
    }

    useEffect(() => {
        fetchCarriers()
    }, [])

    //Order
    const handleOrder = async () => {
        const response = await newOrder({
            userId: session.user.id,
            address: `${selectedAddress.address} ${selectedAddress.postalCode} ${selectedAddress.city} ${selectedAddress.country}`,
            carrierName: selectedCarrier.name,
            carrierPrice: selectedCarrier.price,
            products: cartProducts,
        })

        if (response.data.url) {
            window.location = response.data.url
        }
    }

    useEffect(() => {
        if (
            Object.keys(selectedAddress).length > 0 &&
            Object.keys(selectedCarrier).length > 0
        ) {
            setIsOrderFilled(true)
        }
    }, [selectedAddress, selectedCarrier])

    return (
        <>
            <div className="flex flex-col md:flex-row md:space-x-5 md:items-start">
                <Cart
                    products={products}
                    cartProducts={cartProducts}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
                <Order
                    subTotal={subTotal}
                    shipping={shipping}
                    handleOrder={handleOrder}
                >
                    <div className="cart-details flex flex-col mb-5">
                        <div className="cart-subtotal flex justify-between">
                            <span>Sous total</span>
                            <span className="font-medium">
                                {formatPrice(subTotal)}
                            </span>
                        </div>
                        <div className="cart-shipping flex justify-between">
                            <span>Livraison</span>
                            <span className="font-medium">
                                {formatPrice(shipping)}
                            </span>
                        </div>
                        <hr />
                        <div className="cart-total flex justify-between">
                            <span>Total</span>
                            <span className="font-bold">
                                {formatPrice(subTotal + shipping)}
                            </span>
                        </div>
                    </div>

                    <button
                        className={`btn btn-primary btn-md ${
                            isOrderFilled ? null : "btn-disabled"
                        }`}
                        onClick={() => handleOrder()}
                    >
                        Passer au paiement
                    </button>
                </Order>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-5 md:items-start">
                <Address
                    datas={addressFormDatas}
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    handleChange={handleChange}
                    handleAddressChange={handleAddressChange}
                    handleSubmit={handleSubmit}
                />
                <Carrier
                    carriers={carriers}
                    handleCarrierChange={handleCarrierChange}
                />
            </div>
        </>
    )
}
