import React, { useState } from "react"

export default function ProductFilterListItem({ item, itemArray, datas, handleFilterArray }) {
    const [isActive, setIsActive] = useState(false)

    return (
        <button
            type="button"
            className={`btn btn-sm mr-1 ${
                datas?.[itemArray]?.find((cat) => cat.name === item.name) ? "btn-primary" : ""
            }`}
            onClick={() => handleFilterArray(item, itemArray)}
        >
            {item.name}
        </button>
    )
}
