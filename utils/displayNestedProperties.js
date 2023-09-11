export function DisplayNestedProperties(data, path) {
    const keys = path.split(".")
    if (keys < 2) {
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
