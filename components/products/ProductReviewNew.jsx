import React, { useState } from "react"
import Form from "../Form"
import Input from "../Input"
import Modal from "../Modal"
import { formatErrors } from "@/utils/formatErrors"
import { useRouter } from "next/navigation"
import { newReview } from "@/app/services/reviewAPI"
import { useSession } from "next-auth/react"

export default function ProductReviewNew({ product }) {
    const [datas, setDatas] = useState({
        rating: "5",
    })
    const [errors, setErrors] = useState([])

    const router = useRouter()

    const { data: session } = useSession()

    const handleSubmit = async (datas, closeModal) => {
        try {
            await newReview({
                message: datas.message,
                rating: parseInt(datas.rating),
                productId: product.id,
                userId: session.user.id,
            })
            setErrors([])
            closeModal.click()
            router.refresh()
        } catch (error) {
            setErrors(formatErrors(error))
        }
    }

    const handleChange = (e) => {
        console.log("e", e.currentTarget.value)
        setDatas({ ...datas, [e.target.name]: e.target.value })
    }

    return (
        <>
            <label htmlFor="new-review-form" className="btn btn-sm">
                Écrire un commentaire
            </label>

            <Modal id="new-review-form">
                <h3 className="h2">Écrire un commentaire</h3>
                <Form datas={datas} handleSubmit={handleSubmit} modalId="new-review-form">
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
                    />
                </Form>
            </Modal>
        </>
    )
}
