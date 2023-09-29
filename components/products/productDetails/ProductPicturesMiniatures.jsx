import React from "react"
import Image from "next/image"

export default function ProductPicturesMiniatures({ product, handlePicture }) {
    return (
        <div className="pictures-miniatures mt-3 flex space-x-3">
            {product.pictures.map((picture) => (
                <Image
                    src={picture.url}
                    width={50}
                    height={50}
                    alt={product.name}
                    className="rounded-xl shadow-sm cursor-pointer"
                    key={picture.id}
                    onMouseEnter={() => handlePicture(picture.url)}
                />
            ))}
        </div>
    )
}
