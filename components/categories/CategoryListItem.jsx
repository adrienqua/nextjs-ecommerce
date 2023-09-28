import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function CategoryListItem({ category }) {
    return (
        <>
            <Link href={`#`} className="card bg-base-100 shadow-xl image-full">
                <figure>
                    <Image src="/img/placeholder.jpg" width={500} height={350} alt="catégorie" />
                </figure>
                <div className="card-body justify-center">
                    <h2 className="text-3xl font-bold uppercase text-center">{category.name}</h2>
                </div>
            </Link>
        </>
    )
}
