"use client"
import React, { useEffect, useState } from "react"

export default function ProductAttributes({ product, setSelectedVariant }) {
    const [selectedSize, setSelectedSize] = useState()
    const [selectedColor, setSelectedColor] = useState()

    let uniqueSizes = new Set()
    let uniqueColors = new Set()

    product.productVariants.forEach((variant) => {
        variant.size?.name && uniqueSizes.add(variant.size?.name)
        variant.color?.name && uniqueColors.add(variant.color?.name)
    })

    uniqueSizes = [...uniqueSizes]
    uniqueColors = [...uniqueColors]

    const handleAttribute = (value, attribute) => {
        if (attribute === "size") {
            setSelectedSize(value)
        }
        if (attribute === "color") {
            setSelectedColor(value)
        }
    }

    function getProductVariant(size, color) {
        return product.productVariants.find(
            (variant) =>
                variant.size?.name === size && variant.color?.name === color
        )
    }

    useEffect(() => {
        setSelectedColor(uniqueColors[0])
        setSelectedSize(uniqueSizes[0])
        setSelectedVariant(product.productVariants[0])
        console.log("de", uniqueColors)
    }, [])

    useEffect(() => {
        const variant = getProductVariant(selectedSize, selectedColor)
        setSelectedVariant(variant)
    }, [selectedColor, selectedSize])

    return (
        <div className="product-attributes">
            {uniqueColors.length > 1 && (
                <div className="color-attribute">
                    <h4 className="mt-2">
                        <span className="font-medium">Couleur : </span>
                        {selectedColor}
                    </h4>
                    {uniqueColors.map((color) => (
                        <button
                            className={`btn btn-sm mr-2 mb-2 ${
                                color === selectedColor && "btn-active"
                            } `}
                            onClick={() => handleAttribute(color, "color")}
                            key={color}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            )}

            {uniqueSizes.length > 0 && (
                <div className="size-attribute">
                    <h4 className="mt-2">
                        <span className="font-medium">Taille : </span>
                        {selectedSize}
                    </h4>
                    {uniqueSizes.map((size) => (
                        <button
                            className={`btn btn-sm mr-2 mb-2 ${
                                size === selectedSize && "btn-active"
                            } `}
                            onClick={() => handleAttribute(size, "size")}
                            key={size}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
