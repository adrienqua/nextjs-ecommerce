import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/utils/formatPrice"

export default function CartItem({ product, handleIncrement, handleDecrement }) {
    const [productPicture, setProductPicture] = useState()

    const handlePicture = () => {
        const picture = product.product.pictures?.find((pic) => pic.colorId === product.colorId)
        setProductPicture(picture?.url)
    }

    useEffect(() => {
        handlePicture()
    }, [])

    return (
        <tr>
            <td className="px-0 md:px-4">
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <div>
                        <Image
                            width={50}
                            height={50}
                            src={productPicture ? productPicture : "/img/placeholder.jpg"}
                            alt={product.product.name}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="">
                        <Link href={`products/${product.product.id}`} className="text-gray-800 font-bold">
                            {product.product.name}
                        </Link>
                        <div className="text-gray-500 flex flex-col leading-none">
                            {product.color?.name && (
                                <span>
                                    <small className="font-medium">
                                        Couleur : <span className="font-semibold">{product.color.name}</span>
                                    </small>
                                </span>
                            )}
                            {product.size?.name && (
                                <span>
                                    <small className="font-medium">
                                        Taille : <span className="font-semibold">{product.size.name}</span>
                                    </small>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </td>
            <td className="text-gray-600 font-medium hidden md:table-cell">{formatPrice(product.price)}</td>
            <td className="text-gray-700 font-medium">
                <div className="flex flex-col-reverse md:flex-row items-center md:space-x-1">
                    <button onClick={() => handleDecrement(product.id)} className="btn btn-xs">
                        -
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleIncrement(product.id)} className="btn btn-xs">
                        +
                    </button>
                </div>
            </td>
            <td>
                <span className="text-gray-800 font-semibold">{formatPrice(product.price * product.quantity)}</span>
            </td>
        </tr>
    )
}
