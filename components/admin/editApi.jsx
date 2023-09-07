"use server"
import { editProduct } from "@/app/services/productAPI"
import { productSchema } from "@/prisma/validation"

export async function editProductApi(id, datas) {
    try {
        const validation = productSchema.parse({
            name: datas.name,
            description: datas.description,
            price: parseFloat(datas.price),
            categoryId: datas.categoryId,
        })
        await editProduct(id, validation)
    } catch (error) {
        return error
    }
}
