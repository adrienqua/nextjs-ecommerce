import React from "react"

import Searchbar from "@/components/Searchbar"
import ProductList from "@/components/products/ProductList"
import { getProducts } from "@/app/services/productAPI"

const fetchProducts = async () => {
    "use server"
    const datas = await getProducts()
    return datas
}

export default async function ProductsPage() {
    const products = await fetchProducts()

    return (
        <div>
            <h1 className="text-center text-3xl">Produits</h1>

            <Searchbar />

            <ProductList products={products} />
        </div>
    )
}
