"use client"
import React, { useState } from "react"
import Form from "@/components/Form"
import Input from "@/components/Input"
import Modal from "@/components/Modal"
import Image from "next/image"

import { editProduct, newProduct } from "@/app/services/productAPI"
import { formatErrors } from "@/utils/formatErrors"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { deletePicture } from "@/app/services/pictureAPI"
import _ from "lodash"

export default function ProductForm({ product, categories, colors, sizes, edit = false }) {
    const [datas, setDatas] = useState(
        edit
            ? product
            : {
                  productVariants: [
                      {
                          quantity: 99,
                      },
                  ],
                  specifications: [],
              }
    )
    const [errors, setErrors] = useState({})

    const router = useRouter()

    const handleSubmit = async (datas, id) => {
        try {
            const formData = new FormData()

            //cleanup productVariants only with necessary datas to avoid issues with the api.
            const productVariants = datas.productVariants.map((variant) => ({
                id: variant.id,
                price: variant.price,
                quantity: variant.quantity,
                colorId: variant.colorId,
                sizeId: variant.sizeId,
            }))

            const specifications = datas.specifications.map((spec) => ({
                id: spec.id,
                label: spec.label,
                value: spec.value,
            }))

            formData.set("name", datas.name)
            formData.set("description", datas.description)
            formData.set("price", parseFloat(datas.price))
            formData.set("categoryId", parseInt(datas.categoryId))
            formData.set("productVariants", JSON.stringify(productVariants))
            formData.set("specifications", JSON.stringify(specifications))

            if (typeof datas.files !== "undefined") {
                for (let i = 0; i < datas.files.length; i++) {
                    formData.append("files", datas.files[i])
                }
            }
            if (edit) {
                await editProduct(id, formData)
                toast.success("Produit modifié !")
            } else {
                await newProduct(formData)
                toast.success("Produit ajouté !")
            }

            router.refresh()
            router.push("/admin/products")
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleDeletePic = async (id) => {
        try {
            await deletePicture(id)

            toast.success("Image supprimée !")
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setDatas({ ...datas, [e.target.name]: e.target.value })
    }

    const handleChangeArray = (e, array, parse = false) => {
        const clonedDatas = _.cloneDeep(datas)
        const index = clonedDatas[array].indexOf(clonedDatas[array][e.target.id])
        clonedDatas[array][index][e.target.name] = parse ? parseFloat(e.target.value) : e.target.value

        setDatas(clonedDatas)
    }

    const handleAddMore = (array, defaultValues) => {
        const clonedDatas = _.cloneDeep(datas)

        if (!clonedDatas[array]) {
            clonedDatas[array] = []
        }

        clonedDatas[array].push(defaultValues)

        setDatas(clonedDatas)
    }
    const handleDeleteRow = (array, id) => {
        const clonedDatas = _.cloneDeep(datas)
        const index = clonedDatas[array].indexOf(clonedDatas[array][id])
        clonedDatas[array].splice(id, 1)

        setDatas(clonedDatas)
    }

    return (
        <Form edit={true} datas={datas} handleSubmit={handleSubmit}>
            <Input
                name="name"
                label="Nom"
                value={datas.name}
                handleChange={(e) => handleChange(e)}
                error={errors.name}
            />
            <Input
                name="files"
                label="Images"
                type="file"
                multiple="multiple"
                handleChange={(e) => setDatas({ ...datas, files: e.target.files })}
                error={errors.files}
            />
            <div className="flex space-x-2">
                {product?.pictures.map((pic) => (
                    <div className="relative" key={pic.id}>
                        <Image
                            src={pic.url}
                            width={75}
                            height={75}
                            alt={pic.url}
                            className="rounded-lg"
                            key={pic.url}
                        />
                        <button
                            type="button"
                            className="btn btn-xs absolute top-0 right-0"
                            onClick={() => handleDeletePic(pic.id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <Input
                name="description"
                label="Description"
                type="textarea"
                value={datas.description}
                handleChange={(e) => handleChange(e)}
                error={errors.description}
            />
            <Input
                name="price"
                label="Prix"
                type="number"
                value={datas.price}
                handleChange={(e) => handleChange(e)}
                error={errors.price}
            />
            <Input
                name="categoryId"
                label="Catégorie"
                type="select"
                value={datas.categoryId}
                options={categories}
                optionLabel="name"
                handleChange={(e) => handleChange(e)}
                error={errors.categoryId}
            />
            <div className="product-variants mt-5">
                <h2 className="h3 text-center mb-3">Variants du produit</h2>
                <div className="flex flex-col">
                    {datas.productVariants.map((variant, index) => (
                        <div className="product-variant flex space-x-2 items-center" key={index}>
                            <Input
                                id={index}
                                name="price"
                                label="Prix variant"
                                type="number"
                                value={datas.productVariants[index].price}
                                handleChange={(e) => handleChangeArray(e, "productVariants", true)}
                                min={0}
                                step={0.01}
                            />
                            <Input
                                id={index}
                                name="quantity"
                                label="Quantité"
                                type="number"
                                value={datas.productVariants[index].quantity}
                                handleChange={(e) => handleChangeArray(e, "productVariants", true)}
                            />
                            <Input
                                id={index}
                                name="colorId"
                                label="Couleur"
                                type="select"
                                value={datas.productVariants[index].colorId}
                                options={colors}
                                optionLabel="name"
                                handleChange={(e) => handleChangeArray(e, "productVariants", true)}
                            />
                            <Input
                                id={index}
                                name="sizeId"
                                label="Taille"
                                type="select"
                                value={datas.productVariants[index].sizeId}
                                options={sizes}
                                optionLabel="name"
                                handleChange={(e) => handleChangeArray(e, "productVariants", true)}
                            />
                            <button
                                type="button"
                                className="btn btn-sm mt-5"
                                onClick={() => handleDeleteRow("productVariants", index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleAddMore("productVariants", { price: datas.price, quantity: 99 })}
                    >
                        Ajouter un variant
                    </button>
                </div>
            </div>

            <div className="product-specifications mt-5 mb-5">
                <h2 className="h3 text-center mb-3">Spécifications</h2>
                <div className="flex flex-col">
                    {datas?.specifications?.map((spec, index) => (
                        <div className="product-variant flex space-x-2 items-center" key={index}>
                            <Input
                                id={index}
                                name="label"
                                label="Titre"
                                value={datas.specifications[index].label}
                                handleChange={(e) => handleChangeArray(e, "specifications")}
                            />
                            <Input
                                id={index}
                                name="value"
                                label="Valeur"
                                value={datas.specifications[index].value}
                                handleChange={(e) => handleChangeArray(e, "specifications")}
                            />
                            <button
                                type="button"
                                className="btn btn-sm mt-5"
                                onClick={() => handleDeleteRow("specifications", index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-sm" onClick={() => handleAddMore("specifications", {})}>
                        Ajouter des spécifications
                    </button>
                </div>
            </div>
        </Form>
    )
}
