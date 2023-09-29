import React from "react"

export default function ProductSpecifications({ product }) {
    return (
        product.specifications.length > 0 && (
            <div className="bg-white rounded-xl px-10 py-10 shadow-sm mb-5">
                <h2 className="h1 mb-4">Caractéristiques</h2>
                <table className="table static rounded-xl bg-gray-100">
                    <tbody>
                        {product.specifications.map((spec) => (
                            <tr key={spec.id}>
                                <th>{spec.label}</th>
                                <td>{spec.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    )
}
