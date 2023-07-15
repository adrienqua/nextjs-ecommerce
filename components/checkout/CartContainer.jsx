"use client"

import { getCart } from "@/app/services/cartAPI"
import { useCartContext } from "@/components/contexts/CartContext"
import { formatPrice } from "@/utils/formatPrice"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import Order from "./Order"
import Cart from "./Cart"
import { useRouter } from "next/navigation"

export default function CartContainer({ children }) {
    const [products, setProducts] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [shipping, setShipping] = useState(1)

    const { cartProducts, handleAddToCart, handleSubstractToCart } =
        useCartContext()
    const router = useRouter()

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
        subTotal > 60 ? setShipping(0) : setShipping(4.99)
    }, [subTotal])

    //Order
    const handleOrder = () => {
        router.push("/checkout")
    }

    return (
        <div className="flex flex-col md:flex-row md:space-x-5 md:items-start">
            <Cart
                products={products}
                cartProducts={cartProducts}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
            />
            <Order subTotal={subTotal} shipping={shipping}>
                <div className="cart-details flex flex-col mb-5">
                    <div className="cart-subtotal flex justify-between">
                        <span>Sous total</span>
                        <span className="font-medium">
                            {formatPrice(subTotal)}
                        </span>
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-md"
                    onClick={() => handleOrder()}
                >
                    Passer la commande
                </button>
            </Order>
        </div>
    )
}
