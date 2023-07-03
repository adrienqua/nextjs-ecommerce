import React from "react"
import ProductListItem from "./ProductListItem"

export default function ProductList({ products }) {
    return (
        <div className="products grid grid-cols-4 gap-4 ">
            {products.map((product) => (
                <ProductListItem key={product.id} product={product} />
            ))}
        </div>
    )
}
