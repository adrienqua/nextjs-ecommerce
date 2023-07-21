import { getProduct } from "@/app/services/productAPI"
import AddToCart from "@/components/products/AddToCart"
import Image from "next/image"
import React from "react"

const fetchProduct = async (id) => {
    const datas = await getProduct(id)
    return datas
}

export default async function ProductDetails({ params }) {
    const product = await fetchProduct(params.id)
    return (
        <div>
            <div className="product-description flex flex-col lg:flex-row items-center">
                <div className="p-5 shrink-0">
                    <Image
                        src="/img/500.jpg"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        className="rounded-xl"
                    />
                </div>
                <div className="p-5 prose">
                    <h1 className="text-3xl">{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{parseFloat(product.price).toFixed(2)} €</p>
                    <AddToCart id={product.id} />
                </div>
            </div>
            <div className="product-long-description  w-full lg:w-1/2  p-5 ">
                <div className="">
                    <table className="table text-center bg-white rounded-xl ">
                        <tbody>
                            <tr>
                                <th>Marque</th>
                                <td>Samsung</td>
                            </tr>
                            <tr>
                                <th>Couleur</th>
                                <td>Noir</td>
                            </tr>
                            <tr>
                                <th>Matière</th>
                                <td>Aluminium</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
