import React, { useEffect, useRef, useState } from "react"
import Form from "../Form"
import Input from "../Input"
import Modal from "../Modal"
import { formatDate } from "./../../utils/formatDate"
import { formatErrors } from "@/utils/formatErrors"
import { useRouter } from "next/navigation"
import { deleteReview, editReview } from "@/app/services/reviewAPI"
import { useSession } from "next-auth/react"

export default function ProductReviewItem({ review, productId }) {
    const [datas, setDatas] = useState({})
    const [errors, setErrors] = useState([])

    const router = useRouter()
    const closeModalRef = useRef(null)

    const { data: session } = useSession()

    const handleSubmit = async (datas, closeModal) => {
        try {
            await editReview(review.id, {
                message: datas.message,
                rating: parseInt(datas.rating),
                productId: productId,
                userId: session.user.id,
            })
            setErrors([])
            closeModal.click()
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteReview(id)
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleChange = (e) => {
        console.log("e", e.currentTarget.value)
        setDatas({ ...datas, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setDatas(review)
    }, [])

    return (
        <>
            <div className="border border-base-200 rounded-lg px-4 py-3 ">
                <div className="review-header text-sm mb-2 flex justify-between items-center">
                    <div>
                        <span className="font-bold">{review.user.name}</span>{" "}
                        <span className="text-slate-400 ">{formatDate(review.createdAt)}</span>
                    </div>
                    <div className="dropdown dropdown-end flex ">
                        <label tabIndex={0} className="btn btn-ghost btn-xs">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <label htmlFor={`edit-review-${review.id}`}>Editer</label>
                            </li>
                            <li>
                                <label htmlFor={`delete-review-${review.id}`}>Supprimer</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="border-base-200 -mt-2" />
                <p className="text-sm mt-2">{review.message}</p>
            </div>

            <Modal id={`edit-review-${review.id}`}>
                <h3 className="h2">Modifier mon commentaire</h3>
                <Form datas={datas} handleSubmit={handleSubmit} modalId={`edit-review-${review.id}`}>
                    <div className="text-left mr-auto">
                        <label className="label">
                            <span className="label-text font-medium">Note</span>
                        </label>
                        <div className="rating">
                            <input
                                type="radio"
                                name="rating"
                                value="1"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={(e) => handleChange(e)}
                            />
                            <input
                                type="radio"
                                name="rating"
                                value="2"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={(e) => handleChange(e)}
                            />
                            <input
                                type="radio"
                                name="rating"
                                value="3"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={(e) => handleChange(e)}
                            />
                            <input
                                type="radio"
                                name="rating"
                                value="4"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={(e) => handleChange(e)}
                            />
                            <input
                                type="radio"
                                name="rating"
                                value="5"
                                className="mask mask-star-2 bg-orange-400"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <Input
                        width="w-full"
                        name="message"
                        label="Commentaire"
                        type="textarea"
                        handleChange={(e) => handleChange(e)}
                        error={errors.message}
                        value={datas.message}
                    />
                </Form>
            </Modal>

            <Modal id={`delete-review-${review.id}`}>
                <h3 className="font-bold text-lg">Supprimer le commentaire</h3>
                <p className="py-4 text-center">Etes vous sûr de vouloir supprimer ce commentaire ?</p>
                <div className=" flex flex-col items-center">
                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(review.id, closeModalRef.current)}
                    >
                        Supprimer
                    </button>
                    <label htmlFor={`delete-review${review.id}`} ref={closeModalRef} className="btn btn-sm hidden">
                        Close modal
                    </label>
                </div>
            </Modal>
        </>
    )
}
