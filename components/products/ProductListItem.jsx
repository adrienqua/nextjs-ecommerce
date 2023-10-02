"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import Like from "../Like"
import AddToCart from "./productDetails/AddToCart"

export default function ProductListItem({ product, user }) {
    return (
        <>
            <div className="card card-compact bg-white shadow-sm relative" key={product.id}>
                <div className="absolute top-2 right-2 z-20">
                    <Like productId={product.id} favorites={product?.favorites} userId={user?.id} />
                </div>
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
                        <div className="pt-[5px]">
                            <span>{parseFloat(product.price).toFixed(2)} €</span>
                        </div>
                        {/* <AddToCart id={product.id} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
