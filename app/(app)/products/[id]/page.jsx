import { getProduct } from "@/app/services/productAPI"
import { fetchProduct } from "@/components/actions/fetchProducts"
import AddToCart from "@/components/products/AddToCart"
import ProductAttributes from "@/components/products/ProductAttributes"
import ProductDescription from "@/components/products/ProductDescription"
import Image from "next/image"
import React from "react"

export async function generateMetadata({ params, searchParams }, parent) {
    const product = await fetchProduct(params.id)

    return {
        title: `${product.name} - Next.js ecommerce`,
    }
}

export default async function ProductDetailsPage({ params }) {
    const product = await fetchProduct(params.id)

    return (
        <div>
            <ProductDescription product={product} />
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
