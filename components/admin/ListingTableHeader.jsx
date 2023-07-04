import Image from "next/image"
import React from "react"

export default function ListingTableHeader({ data }) {
    return <th>{data.label}</th>
}
