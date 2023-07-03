"use client"
import React from "react"

export default function Input({
    name,
    label,
    onChange,
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
                        onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChange(e)}
                        rows="5"
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
                        onChange={(e) => onChange(e, "true")}
                        defaultValue={""}
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
