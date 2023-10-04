import React from "react"
import ProductFilterListItem from "./ProductFilterListItem"

export default function ProductFilterList({ datas, items, handleFilterArray, itemArray }) {
    return (
        <div className="px-4 space-y-1 mb-4">
            {items.map((item) => (
                <ProductFilterListItem
                    handleFilterArray={handleFilterArray}
                    item={item}
                    itemArray={itemArray}
                    datas={datas}
                    key={item.id}
                />
            ))}
        </div>
    )
}
