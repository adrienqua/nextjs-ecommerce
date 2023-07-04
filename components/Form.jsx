"use client"

import React, { useEffect, useRef, useState, useTransition } from "react"
import Input from "./Input"
import useSWR from "swr"
import { newProduct } from "@/app/services/productAPI"
import { useAuthContext } from "./contexts/authContext"
import { useSession, signIn, signOut } from "next-auth/react"
import { revalidatePath } from "next/cache"

export default function Form({
    children,
    handleSubmit,
    modalId,
    datas,
    edit = false,
}) {
    const { data: session, status } = useSession()

    const { user, setUser } = useAuthContext()
    let [isPending, startTransition] = useTransition()

    const closeModalRef = useRef(null)

    const fetchDatas = async (url) => {
        return await fetch(url).then((res) => res.json())
    }

    const handleSubmitGlobal = async (e) => {
        e.preventDefault()
        if (edit) {
            handleSubmit(datas.id, datas)
            console.log("edit")
        } else {
            handleSubmit(datas)
        }

        if (modalId.length > 0) {
            closeModalRef.current.click()
        }
    }

    return (
        <form
            className="flex flex-col items-center mb-16 m-5"
            /* onSubmit={async (e) => {
                    await handleSubmit(e)
                }} */
            // action={handleSubmit}
            method="POST"
        >
            {children}
            <button
                type="submit"
                className="btn btn-primary  mt-4"
                //formAction={handleSubmit}
                onClick={(e) => handleSubmitGlobal(e)}
            >
                Confirmer
            </button>
            <label
                htmlFor={modalId}
                ref={closeModalRef}
                className="btn btn-sm hidden"
            >
                Close modal
            </label>
        </form>
    )
}
