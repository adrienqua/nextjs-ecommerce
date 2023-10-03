"use client"

import React, { useEffect, useState } from "react"
import Cart from "./Cart"
import CartOrder from "./CartOrder"
import CheckoutAddress from "./CheckoutAddress"
import CheckoutCarrier from "./CheckoutCarrier"
import CheckoutDiscount from "./CheckoutDiscount"
import { useSession } from "next-auth/react"
import { useCartContext } from "@/components/contexts/CartContext"

import { newAddress } from "@/app/services/addressAPI"
import { getUserAddresses } from "@/app/services/userAPI"
import { getCarriers } from "@/app/services/carrierAPI"
import { newOrder } from "@/app/services/checkoutAPI"
import { getCart } from "@/app/services/cartAPI"

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
    const [discount, setDiscount] = useState(null)
    const { data: session } = useSession()

    const { cartProducts, handleAddToCart, handleSubstractToCart } = useCartContext()

    //Cart
    const fetchCart = async () => {
        setProducts(
            await getCart(cartProducts).then((res) => {
                const datas = res.data
                let subtotal = 0
                datas.map((data) => {
                    data.quantity = cartProducts?.filter((id) => id === data.id).length
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
            : Object.keys(selectedCarrier).length > 0 && setShipping(parseFloat(selectedCarrier.price))
    }, [subTotal, selectedCarrier])

    //Address
    const fetchAddresses = async () => {
        setAddresses(await getUserAddresses(session.user.id))
    }

    const handleSubmit = async (datas, closeModal) => {
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
        closeModal.click()
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
            carrierPrice: parseFloat(selectedCarrier.price),
            products: cartProducts,
            discountId: discount?.id,
        })

        if (response.data.url) {
            window.location = response.data.url
        }
    }

    useEffect(() => {
        if (Object.keys(selectedAddress).length > 0 && Object.keys(selectedCarrier).length > 0) {
            setIsOrderFilled(true)
        }
    }, [selectedAddress, selectedCarrier])

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:space-x-5 lg:items-start">
                <div className="lg:w-2/3">
                    <Cart
                        products={products}
                        cartProducts={cartProducts}
                        onIncrement={handleIncrement}
                        onDecrement={handleDecrement}
                    />
                    <div className="flex flex-col lg:flex-row lg:space-x-5 lg:items-start">
                        <CheckoutAddress
                            datas={addressFormDatas}
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            handleChange={handleChange}
                            handleAddressChange={handleAddressChange}
                            handleSubmit={handleSubmit}
                        />
                        <CheckoutCarrier carriers={carriers} handleCarrierChange={handleCarrierChange} />
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/3">
                    <CartOrder
                        subTotal={subTotal}
                        shipping={shipping}
                        handleOrder={handleOrder}
                        isOrderFilled={isOrderFilled}
                        discount={discount}
                    />
                    <CheckoutDiscount setDiscount={setDiscount} />
                </div>
            </div>
        </>
    )
}
