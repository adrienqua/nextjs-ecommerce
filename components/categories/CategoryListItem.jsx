import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function CategoryListItem({ category }) {
    return (
        <>
            <Link href={`/categories/${category.slug}`} className="card  bg-base-100 shadow-xl image-full">
                <figure>
                    <Image
                        src={`/uploads/img/categories/${category.slug}.jpg`}
                        width={500}
                        height={500}
                        alt="catégorie"
                    />
                </figure>
                <div className="card-body justify-center">
                    <h2 className="text-3xl font-bold uppercase text-center">{category.name}</h2>
                </div>
            </Link>
        </>
    )
}
