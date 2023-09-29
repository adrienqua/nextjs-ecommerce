/* import i18next from "i18next" */
import { z } from "zod"
/* import { zodI18nMap } from "zod-i18n-map"
import translation from "zod-i18n-map/locales/fr/zod.json"

i18next.init({
    lng: "fr",
    resources: {
        fr: { zod: translation },
    },
})
z.setErrorMap(zodI18nMap) */

export const categorySchema = z.object({
    name: z.string().min(5),
})

export const productSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    price: z.number(),
    categoryId: z.number(),
})

export const productVariantSchema = z.object({
    productId: z.number(),
    colorId: z.number().optional(),
    sizeId: z.number().optional(),
    price: z.number(),
    quantity: z.number(),
})

export const userSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(5),
    name: z.string().min(2),
})

export const reviewSchema = z.object({
    productId: z.number(),
    userId: z.string(),
    message: z.string().min(5),
    rating: z.number().min(1).max(5),
})

export const discountSchema = z.object({
    code: z.string(),
    amount: z.number(),
    minCartPrice: z.number(),
    isPercent: z.boolean().optional(),
    isActive: z.boolean().optional(),
})
