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
    success,
    width = "w-2/3",
    className = "",
    outerLabel = true,
    ...rest
}) {
    switch (type) {
        default:
            return (
                <div className={`flex flex-col w-full md:${width} mb-4 ${className.length > 0 && className}`}>
                    {outerLabel && (
                        <label className="label">
                            <span className="label-text font-medium">{label}</span>
                        </label>
                    )}
                    <input
                        type={type}
                        name={name}
                        placeholder={label}
                        className={`${type === "file" ? "file-input" : "w-full input input-bordered input-md"} ${
                            error && "input-error"
                        } ${success && "input-success"}`}
                        onChange={handleChange}
                        {...(type === "number" && {
                            min: "0",
                        })}
                        {...(name.indexOf("price") >= 0 && {
                            step: "0.01",
                        })}
                        {...rest}
                    />
                    {error && (
                        <label className="label error">
                            <span className="label-text font-medium text-error">{error}</span>
                        </label>
                    )}
                </div>
            )
        case "textarea":
            return (
                <div className={`flex flex-col w-full md:${width} mb-4`}>
                    <label className="label">
                        <span className="label-text font-medium">{label}</span>
                    </label>
                    <textarea
                        type="text"
                        name={name}
                        placeholder={label}
                        className={`textarea textarea-bordered textarea-md ${error && "textarea-error"}`}
                        onChange={handleChange}
                        rows="5"
                        {...rest}
                    />
                    {error && (
                        <label className="label error">
                            <span className="label-text font-medium text-error">{error}</span>
                        </label>
                    )}
                </div>
            )
        case "select":
            return (
                <div className={`flex flex-col w-full md:${width} mb-4 ${className.length > 0 && className}`}>
                    <label className="label">
                        <span className="label-text font-medium">{label}</span>
                    </label>
                    <select
                        name={name}
                        className={`select select-bordered ${error && "select-error"}`}
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
                            <span className="label-text font-medium text-error">{error}</span>
                        </label>
                    )}
                </div>
            )
        case "radio":
            return (
                <label className="label cursor-pointer">
                    <input type="radio" name={name} className="radio radio-sm checked:bg-primary" {...rest} />
                    <span className="label-text font-medium">{label}</span>
                </label>
            )
        case "boolean":
            return (
                <div className="flex flex-col justify-center mb-4">
                    <label className="label ">
                        <span className="label-text font-medium">{label}</span>
                    </label>
                    <input name={name} type="checkbox" className="toggle " onChange={handleChange} {...rest} />
                </div>
            )
    }
}
