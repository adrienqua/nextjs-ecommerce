"use client"
import React, { useRef, useState } from "react"
import Form from "../Form"
import Input from "../Input"
import { useRouter } from "next/navigation"
import { formatErrors } from "@/utils/formatErrors"
import { getProducts, getFilteredProducts } from "@/app/services/productAPI"
import { toast } from "react-toastify"

export default function ProductFilter({ setProductsFiltered, categories }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState([])

    const router = useRouter()
    const toggleFilterRef = useRef()
    const filterFormRef = useRef()

    const handleChange = (e, parse = false) => {
        let value = e.target.value
        if (parse) {
            value = parseInt(e.target.value)
        }
        setDatas({ ...datas, [e.target.name]: value })
    }

    const handleAddSelect = (e) => {
        let id = parseInt(e.target.value)
        let label = e.target[e.target.selectedIndex].text

        const currentDatas = datas[e.target.name] || []

        if (
            !datas[e.target.name] ||
            !datas[e.target.name].some((item) => item.id === id)
        ) {
            setDatas({
                ...datas,
                [e.target.name]: [...currentDatas, { id: id, label: label }],
            })
        }
    }

    const handleRemoveSelect = (id, name) => {
        const newDatas = [...datas[name]]

        const filteredDatas = newDatas.filter((data) => {
            return data.id !== id
        })

        setDatas({ ...datas, [name]: filteredDatas })
    }

    const handleSubmit = async (datas) => {
        try {
            setProductsFiltered(await getFilteredProducts(datas))
            setErrors([])
            toast.success("Les filtres ont bien été appliqués !")
            router.refresh()
            toggleFilterRef.current.click()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleReset = async () => {
        setProductsFiltered([])
        setDatas({})
        toggleFilterRef.current.click()
        filterFormRef.current.reset()
        console.log(toggleFilterRef)
        toast.info("Les filtres ont été supprimés !")
    }

    return (
        <>
            <div className="collapse collapse-arrow bg-white shadow-sm mb-5">
                <input ref={toggleFilterRef} type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                    Filtres
                </div>
                <div className="collapse-content">
                    <Form
                        datas={datas}
                        handleSubmit={handleSubmit}
                        formRef={filterFormRef}
                    >
                        <h3 className="h3">Prix</h3>
                        <div className="flex space-x-2">
                            <Input
                                name="minPrice"
                                label="Min"
                                type="number"
                                handleChange={(e) => handleChange(e)}
                            />
                            <Input
                                name="maxPrice"
                                label="Max"
                                type="number"
                                handleChange={(e) => handleChange(e)}
                            />
                        </div>
                        <h3 className="h3">Catégories</h3>
                        <Input
                            name="categories"
                            label="Catégories"
                            type="select"
                            options={categories}
                            optionLabel="name"
                            handleChange={(e) => handleAddSelect(e)}
                        />
                        <div className="flex space-x-2">
                            {datas.categories?.map((category) => (
                                <span
                                    key={category.id}
                                    className="badge py-5 px-3 relative pr-10"
                                >
                                    {category.label}{" "}
                                    <button
                                        className="btn bg-base-100 absolute right-2 min-h-0 h-6 px-2"
                                        onClick={(e) =>
                                            handleRemoveSelect(
                                                category.id,
                                                "categories"
                                            )
                                        }
                                    >
                                        X
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="pt-5">
                            <button
                                className="btn"
                                onClick={() => handleReset()}
                            >
                                Supprimer les filtres
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}
