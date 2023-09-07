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

export const userSchema = z.object({
    email: z.string().email().min(5),
    password: z.string().min(6),
})
