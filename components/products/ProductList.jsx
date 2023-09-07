import React from "react"
import ProductListItem from "./ProductListItem"

export default function ProductList({ products }) {
    return (
        <div className="products grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductListItem key={product.id} product={product} />
            ))}
        </div>
    )
}
