import { formatPrice } from "./formatPrice"

export function DisplayNestedProperties(data, path, format) {
    const keys = path.split(".")
    if (keys.length < 2) {
        if (format === "price") {
            return formatPrice(data[path])
        }
        return data[path]
    }
    let current = data

    for (let i = 0; i < keys.length; i++) {
        if (current[keys[i]] === undefined) {
            return undefined
        }
        current = current[keys[i]]
    }

    return current
}
