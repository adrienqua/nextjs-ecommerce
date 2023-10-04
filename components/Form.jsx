"use client"

import React, { useEffect, useRef, useTransition } from "react"
import Input from "./Input"
import useSWR from "swr"
import { newProduct } from "@/app/services/productAPI"
import { useAuthContext } from "./contexts/authContext"
import { revalidatePath } from "next/cache"

export default function Form({
    children,
    handleSubmit,
    modalId,
    datas,
    formRef,
    edit = false,
    submitButton = true,
    ...rest
}) {
    const { user, setUser } = useAuthContext()
    let [isPending, startTransition] = useTransition()

    const closeModalRef = useRef(null)

    const fetchDatas = async (url) => {
        return await fetch(url).then((res) => res.json())
    }

    const handleSubmitGlobal = async (e) => {
        e.preventDefault()
        if (edit) {
            await handleSubmit(datas, datas.id, closeModalRef.current)
            console.log("edit")
        } else {
            await handleSubmit(datas, closeModalRef.current)
        }
    }

    return (
        <form
            className={`flex flex-col items-center mb-10 m-5 `}
            /* onSubmit={async (e) => {
                    await handleSubmit(e)
                }} */
            // action={handleSubmit}
            onSubmit={handleSubmitGlobal}
            method="POST"
            ref={formRef}
            {...rest}
        >
            {children}
            {submitButton && (
                <button
                    type="submit"
                    className="btn btn-primary  mt-2"
                    //formAction={handleSubmit}
                >
                    Confirmer
                </button>
            )}
            <label htmlFor={modalId} ref={closeModalRef} className="btn btn-sm hidden">
                Close modal
            </label>
        </form>
    )
}
