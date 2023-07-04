"use client"
import React from "react"

export default function Input({
    name,
    label,
    handleChange,
    type = "text",
    options,
    ...rest
}) {
    switch (type) {
        default:
            return (
                <div className="flex flex-col w-full md:w-2/3 mb-4">
                    <label className="label">
                        <span className="label-text font-medium">{label}</span>
                    </label>
                    <input
                        type={type}
                        name={name}
                        placeholder={label}
                        className="input input-bordered input-md"
                        onChange={handleChange}
                        {...rest}
                    />
                </div>
            )
        case "textarea":
            return (
                <div className="flex flex-col w-full md:w-2/3 mb-4">
                    <label className="label">
                        <span className="label-text font-medium">{label}</span>
                    </label>
                    <textarea
                        type="text"
                        name={name}
                        placeholder={label}
                        className="textarea textarea-bordered textarea-md"
                        onChange={handleChange}
                        rows="5"
                        {...rest}
                    />
                </div>
            )
        case "select":
            return (
                <div className="flex flex-col w-full md:w-2/3 mb-4">
                    <label className="label">
                        <span className="label-text font-medium">{label}</span>
                    </label>
                    <select
                        name={name}
                        className="select select-bordered"
                        onChange={handleChange}
                        defaultValue={""}
                        {...rest}
                    >
                        <option value="" disabled>
                            {label}
                        </option>
                        {options.map((option) => (
                            <option key={option.id} value={parseInt(option.id)}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            )
    }
}
