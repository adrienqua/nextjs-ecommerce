export function formatErrors(error) {
    const errors = error?.response?.data?.issues
    const formatedErrors = {}
    errors?.forEach((err) => {
        formatedErrors[err.path[0]] = err.message
    })

    return formatedErrors
}
