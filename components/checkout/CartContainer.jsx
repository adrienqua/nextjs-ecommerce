"use client"

import React, { useEffect, useState } from "react"
import { useCartContext } from "@/components/contexts/CartContext"
import Cart from "./Cart"
import CartOrder from "./CartOrder"
import { useRouter } from "next/navigation"
import { getCart } from "@/app/services/cartAPI"

export default function CartContainer({ children, user }) {
    const [products, setProducts] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [shipping, setShipping] = useState(1)

    const { cartProducts, handleAddToCart, handleSubstractToCart } = useCartContext()
    const router = useRouter()

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
        cartProducts && fetchCart()
    }, [cartProducts])

    useEffect(() => {
        subTotal > 60 ? setShipping(0) : setShipping(4.99)
    }, [subTotal])

    //Order
    const handleOrder = () => {
        if (!user) {
            return router.push("/login")
        }
        router.push("/checkout")
    }

    return (
        <div className="flex flex-col md:flex-row md:space-x-5 md:items-start">
            <div className="md:w-2/3">
                <Cart
                    products={products}
                    cartProducts={cartProducts}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                />
            </div>
            <div className="flex flex-col md:w-1/3">
                <CartOrder subTotal={subTotal} handleOrder={handleOrder} cart={true} />
            </div>
        </div>
    )
}
