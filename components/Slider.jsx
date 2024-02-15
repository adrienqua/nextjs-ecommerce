"use client"
import React from "react"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import Link from "next/link"
import Image from "next/image"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function Slider() {
    return (
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="flex h-[350px] lg:h-[550px] min-[2000px]:h-[700px] w-[100vw] !ml-[calc(-50vw+50%)] !mr-[calc(-50vw+50%)] -mt-8 mb-20"
            >
                <SwiperSlide className="!flex justify-center items-center text-left relative">
                    <div className="slide-content text-white absolute container left-auto">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold sm:!leading-[1.3] max-w-[160px] md:max-w-[310px] xl:max-w-[420px] ml-8 lg:ml-4">
                            Découvrez notre nouvelle collection !
                        </h2>
                    </div>
                    <Link href="/products" className="w-full h-full">
                        <Image
                            src="/uploads/img/slider/slider1.jpg"
                            width={0}
                            height={0}
                            quality={100}
                            priority={true}
                            sizes="100vw"
                            alt="Découvrez nos produits"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </SwiperSlide>
                <SwiperSlide className="!flex justify-center items-center text-left relative">
                    <div className="slide-content text-white absolute container left-auto">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold sm:!leading-[1.3] max-w-[160px] md:max-w-[310px] xl:max-w-[420px] ml-8 lg:ml-4">
                            -10% dès 70€ d&apos;achat avec le code PROMO10
                        </h2>
                    </div>
                    <Link href="/products" className="w-full h-full">
                        <Image
                            src="/uploads/img/slider/slider2.jpg"
                            width={0}
                            height={0}
                            quality={100}
                            priority={true}
                            sizes="100vw"
                            alt="Code promo"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
