import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import ProductPicturesMiniatures from "./ProductPicturesMiniatures"
import { handleGalleryScroll } from "@/utils/galleryScroll"

export default function ProductPictures({ product, selectedColorId }) {
    const [selectedPicture, setSelectedPicture] = useState(product?.pictures?.[0]?.url)

    const galleryRef = useRef(null)
    const galleryMainPicRef = useRef(null)

    const handlePicture = (picture) => {
        setSelectedPicture(picture)
    }

    useEffect(() => {
        handleGalleryScroll(galleryMainPicRef)
    }, [])

    useEffect(() => {
        const filterPictures = product?.pictures?.find((pic) => pic.colorId === selectedColorId)
        //console.log(filterPictures, "filt")
        filterPictures && setSelectedPicture(filterPictures.url)
    }, [selectedColorId])

    return (
        <>
            <div onClick={() => galleryRef.current.showModal()}>
                <Image
                    src={selectedPicture ? selectedPicture : "/img/placeholder.jpg"}
                    width={604}
                    height={604}
                    quality={100}
                    alt={product.name}
                    className="rounded-xl shadow-sm cursor-pointer w-full"
                />
            </div>
            <ProductPicturesMiniatures product={product} handlePicture={handlePicture} />

            <dialog ref={galleryRef} className="modal backdrop:bg-white">
                <div ref={galleryMainPicRef} className="modal-box max-w-5xl p-0 overflow-hidden">
                    <Image
                        src={selectedPicture ? selectedPicture : "/img/placeholder.jpg"}
                        width={2000}
                        height={2000}
                        quality={100}
                        alt={product.name}
                        className="rounded-xl shadow-sm cursor-pointer"
                    />
                </div>
                <div className="absolute bottom-2">
                    <ProductPicturesMiniatures product={product} handlePicture={handlePicture} />
                </div>
                <form method="dialog">
                    <button className="btn text-lg btn-circle btn-ghost absolute right-3 top-3">✕</button>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
