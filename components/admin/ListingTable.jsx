import Image from "next/image"
import React from "react"
import ListingTableItem from "./ListingTableItem"
import ListingTableHeader from "./ListingTableHeader"
import Categories from "./../../app/categories/page"

export default function ListingTable({
    headerDatas,
    datas,
    categories,
    handleEdit,
}) {
    return (
        <div className="overflow-x-auto">
            <table className="table mt-5 rounded-t-xl overflow-hidden">
                <thead className="bg-base-200 text-black ">
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
                            key={data.id}
                            categories={categories}
                            handleEdit={handleEdit}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
