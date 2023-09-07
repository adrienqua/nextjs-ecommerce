"use client"
import React from "react"

export default function Input({
    name,
    label,
    handleChange,
    type = "text",
    options,
    optionLabel,
    error,
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
                        className={`input input-bordered input-md ${
                            error && "input-error"
                        } `}
                        onChange={handleChange}
                        {...rest}
                    />
                    {error && (
                        <label className="label error">
                            <span className="label-text font-medium text-error">
                                {error}
                            </span>
                        </label>
                    )}
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
                        className={`textarea textarea-bordered textarea-md ${
                            error && "textarea-error"
                        }`}
                        onChange={handleChange}
                        rows="5"
                        {...rest}
                    />
                    {error && (
                        <label className="label error">
                            <span className="label-text font-medium text-error">
                                {error}
                            </span>
                        </label>
                    )}
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
                        className={`select select-bordered ${
                            error && "select-error"
                        }`}
                        onChange={handleChange}
                        defaultValue={""}
                        {...rest}
                    >
                        <option value="" disabled>
                            {label}
                        </option>
                        {options.map((option) => (
                            <option key={option.id} value={parseInt(option.id)}>
                                {option[optionLabel]}
                            </option>
                        ))}
                    </select>
                    {error && (
                        <label className="label error">
                            <span className="label-text font-medium text-error">
                                {error}
                            </span>
                        </label>
                    )}
                </div>
            )
        case "radio":
            return (
                <label className="label cursor-pointer">
                    <input
                        type="radio"
                        name={name}
                        className="radio radio-sm checked:bg-primary"
                        {...rest}
                    />
                    <span className="label-text">{label}</span>
                </label>
            )
    }
}
