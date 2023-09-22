import React from "react"
import ProductListItem from "./ProductListItem"

export default function ProductList({ products }) {
    return (
        <>
            {products.length > 0 ? (
                <div
                    id="products"
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20"
                >
                    {products.map((product) => (
                        <ProductListItem key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="px-4">Pas de produits correspondant à ces critères.</p>
            )}
        </>
    )
}
