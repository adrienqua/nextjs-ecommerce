import { deleteFavorite, newFavorite } from "@/app/services/favorite.API"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function Like({ productId, favorites, userId }) {
    const [isLiked, setIsLiked] = useState(false)
    const [favoriteId, setFavoriteId] = useState()

    const router = useRouter()

    const handleLike = async () => {
        if (!userId) {
            return router.push("/login")
        }
        if (isLiked) {
            try {
                setIsLiked(false)
                toast.success("Produit supprimé des favoris !")
                await deleteFavorite(favoriteId)
            } catch (error) {
                console.log(false)
                setIsLiked(false)
            }
        } else {
            try {
                setIsLiked(true)
                await newFavorite({
                    productId: productId,
                    userId: userId,
                }).then((res) => {
                    setFavoriteId(res.data.id)
                })
                toast.success("Produit ajouté aux favoris !")
            } catch (error) {
                console.log(true)
                setIsLiked(true)
            }
        }
    }

    useEffect(() => {
        if (favorites && favorites.length > 0) {
            setIsLiked(true)
            setFavoriteId(favorites[0].id)
        }
    }, [])

    return (
        <span className="cursor-pointer mt-2" onClick={() => handleLike()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${isLiked && "fill-primary text-primary"}`}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
            </svg>
        </span>
    )
}
