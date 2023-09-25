import React, { useState } from "react"
import Image from "next/image"

export default function ProductPictures({ product }) {
    const [selectedPicture, setSelectedPicture] = useState(product?.pictures?.[0]?.url)

    const handlePicture = (picture) => {
        setSelectedPicture(picture)
    }

    return (
        <>
            <Image
                src={selectedPicture ? selectedPicture : "/img/placeholder.jpg"}
                width={604}
                height={604}
                quality={100}
                alt={product.name}
                className="rounded-xl shadow-sm"
            />
            <div className="pictures-miniatures mt-3 flex space-x-3">
                {product.pictures.map((picture) => (
                    <Image
                        src={picture.url}
                        width={50}
                        height={50}
                        alt={product.name}
                        className="rounded-xl shadow-sm cursor-pointer"
                        key={picture.id}
                        onClick={() => handlePicture(picture.url)}
                    />
                ))}
            </div>
        </>
    )
}
