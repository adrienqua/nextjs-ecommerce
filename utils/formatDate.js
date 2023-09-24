export const formatDate = (format) => {
    const date = new Date(format)

    var options = { year: "numeric", month: "long", day: "numeric" }

    return "le " + date.toLocaleString("fr-FR", options)
}
