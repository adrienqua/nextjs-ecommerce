"use client"
import React from "react"

export default function Modal({ children, id }) {
    return (
        <>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-xl">
                    <label htmlFor={id} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-5.5">
                        ✕
                    </label>
                    {children}
                </div>
                <label className="modal-backdrop" htmlFor={id}>
                    Close
                </label>
            </div>
        </>
    )
}
