import React from "react"

export default function ReviewStars({ rating }) {
    return (
        <div className="rating rating-xs">
            <input className={`mask mask-star-2 bg-orange-400 ${rating <= 0 && "bg-opacity-25"}`} />
            <input className={`mask mask-star-2 bg-orange-400 ${rating <= 1 && "bg-opacity-25"}`} />
            <input className={`mask mask-star-2 bg-orange-400 ${rating <= 2 && "bg-opacity-25"}`} />
            <input className={`mask mask-star-2 bg-orange-400 ${rating <= 3 && "bg-opacity-25"}`} />
            <input className={`mask mask-star-2 bg-orange-400 ${rating <= 4 && "bg-opacity-25"}`} />
        </div>
    )
}
