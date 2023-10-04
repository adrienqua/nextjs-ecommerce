"use client"
import React, { useRef, useState } from "react"
import Form from "../Form"
import Input from "../Input"
import { useRouter } from "next/navigation"
import { formatErrors } from "@/utils/formatErrors"
import { getProducts, getFilteredProducts } from "@/app/services/productAPI"
import { toast } from "react-toastify"
import _ from "lodash"
import ProductFilterItem from "./ProductFilterListItem"
import ProductFilterList from "./ProductFIlterList"

export default function ProductFilter({ setProductsFiltered, categories, colors, sizes, user }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState([])

    const router = useRouter()
    const closeFilterRef = useRef(null)
    const filterFormRef = useRef(null)

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleFilterArray = (item, itemArray) => {
        let id = item.id
        let name = item.name

        const currentDatas = _.cloneDeep(datas[itemArray]) || []

        //add item to datas[itemArray]
        if (!datas[itemArray] || !datas[itemArray].some((itm) => itm.id === id)) {
            setDatas({
                ...datas,
                [itemArray]: [...currentDatas, { id: id, name: name }],
            })
        }
        //remove item from datas[itemArray]
        else {
            const filteredArray = currentDatas.filter((data) => data.id !== id)
            setDatas({ ...datas, [itemArray]: filteredArray })
        }
    }

    const handleSubmit = async (datas) => {
        try {
            setProductsFiltered(await getFilteredProducts(datas, user?.id))
            setErrors([])
            toast.success("Les filtres ont bien été appliqués !")
            router.refresh()
            closeFilterRef.current.click()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleReset = async () => {
        setProductsFiltered(null)
        setDatas({})
        closeFilterRef.current.click()
        filterFormRef.current.reset()
        console.log(closeFilterRef)
        toast.info("Les filtres ont été supprimés !")
    }

    return (
        <>
            <label
                ref={closeFilterRef}
                htmlFor="filters-drawer"
                className="btn bg-white border-white shadow-sm hover:bg-slate-200 hover:border-slate-200  mb-4 text-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                </svg>
                Filtres
            </label>

            <div className="drawer drawer-end z-50">
                <input id="filters-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">{/* Page content here */}</div>
                <div className="drawer-side">
                    <label htmlFor="filters-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu px-0 py-4 w-80 min-h-full bg-white text-base-content bg-opacity-90 backdrop-blur-sm">
                        <h2 className="h2 -mb-4 ml-9">Filtrer et trier</h2>
                        <Form datas={datas} handleSubmit={handleSubmit} formRef={filterFormRef} submitButton={false}>
                            <li className="w-full">
                                <details open>
                                    <summary className="font-semibold text-base">Prix</summary>
                                    <div className="px-4">
                                        <div className="flex space-x-2">
                                            <Input
                                                name="minPrice"
                                                label="Min"
                                                type="number"
                                                handleChange={(e) => handleChange(e)}
                                                className="!w-1/2"
                                            />
                                            <Input
                                                name="maxPrice"
                                                label="Max"
                                                type="number"
                                                handleChange={(e) => handleChange(e)}
                                                className="!w-1/2"
                                            />
                                        </div>
                                    </div>
                                </details>
                            </li>
                            <li className="w-full">
                                <details open>
                                    <summary className="font-semibold text-base">Catégories</summary>
                                    <div className="px-4 space-y-1 mb-4">
                                        <ProductFilterList
                                            datas={datas}
                                            items={categories}
                                            handleFilterArray={handleFilterArray}
                                            itemArray="categories"
                                        />
                                    </div>
                                </details>
                            </li>
                            <li className="w-full">
                                <details open>
                                    <summary className="font-semibold text-base">Couleurs</summary>
                                    <ProductFilterList
                                        datas={datas}
                                        items={colors}
                                        handleFilterArray={handleFilterArray}
                                        itemArray="colors"
                                    />
                                </details>
                            </li>
                            <li className="w-full">
                                <details open>
                                    <summary className="font-semibold text-base">Tailles</summary>
                                    <ProductFilterList
                                        datas={datas}
                                        items={sizes}
                                        handleFilterArray={handleFilterArray}
                                        itemArray="sizes"
                                    />
                                </details>
                            </li>
                            <div className="flex space-x-2 my-5">
                                <button className="btn" onClick={() => handleReset()}>
                                    Supprimer les filtres
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Filtrer
                                </button>
                            </div>
                        </Form>
                    </ul>
                </div>
            </div>
        </>
    )
}
