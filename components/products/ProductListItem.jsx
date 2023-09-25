import Image from "next/image"
import Link from "next/link"
import React from "react"
import AddToCart from "./AddToCart"

export default function ProductListItem({ product }) {
    return (
        <>
            <div className="card card-compact bg-white shadow-sm" key={product.id}>
                <Link href={`/products/${product.id}`}>
                    <figure className="rounded-t-2xl aspect-square">
                        <Image
                            src={product.pictures.length > 0 ? product?.pictures?.[0]?.url : "/img/placeholder.jpg"}
                            width={300}
                            height={300}
                            quality={100}
                            alt={product.name}
                            className="object-cover w-full h-full hover:scale-105 duration-300"
                        />
                    </figure>
                </Link>
                <div className="card-body">
                    <div className="card-actions flex flex-row">
                        <Link className="flex-1" href={`/products/${product.id}`}>
                            <h2 className="card-title text-lg">{product.name}</h2>
                        </Link>
                        <div className="basis-1/4 pt-[5px]">
                            <span>{parseFloat(product.price).toFixed(2)} €</span>
                        </div>
                        {/* <AddToCart id={product.id} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
