"use client"
import Image from "next/image"
import React from "react"
import ListingTableItem from "./ListingTableItem"
import ListingTableHeader from "./ListingTableHeader"

export default function ListingTable({
    headerDatas,
    datas,
    handleEdit,
    formDatas,
    detailsDatas,
}) {
    return (
        <div className="overflow-x-auto">
            <table className="table mt-5 rounded-t-xl overflow-hidden">
                <thead className="bg-base-100 text-black ">
                    <tr>
                        {headerDatas.map((headerDatas) => (
                            <ListingTableHeader
                                data={headerDatas}
                                key={headerDatas.name}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datas.map((data) => (
                        <ListingTableItem
                            data={data}
                            headerDatas={headerDatas}
                            formDatas={formDatas}
                            key={data.id}
                            handleEdit={handleEdit}
                            detailsDatas={detailsDatas}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
