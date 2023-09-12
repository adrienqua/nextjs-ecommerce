import React from "react"
import CategoryListItem from "./CategoryListItem"

export default function CategoryList({ categories }) {
    return (
        <div className="categories grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
                <CategoryListItem key={category.name} category={category} />
            ))}
        </div>
    )
}
