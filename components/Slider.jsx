"use client"
import React, { useRef, useState } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import Image from "next/image"

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
                    <div className="slide-content text-white absolute left-[12%]  max-w-[150px] md:max-w-[300px]">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
                            Découvrez notre nouvelle collection !
                        </h2>
                    </div>
                    <a href="/products" className="w-full h-full">
                        <Image
                            src="/uploads/img/slider/slider1.jpg"
                            width={0}
                            height={0}
                            quality={100}
                            sizes="100vw"
                            alt="slider1"
                            className="w-full h-full object-cover"
                        />
                    </a>
                </SwiperSlide>
                <SwiperSlide className="!flex justify-center items-center text-left relative">
                    <div className="slide-content text-white absolute left-[12%]  max-w-[150px] md:max-w-[300px]">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold">
                            Découvrez notre nouvelle collection !
                        </h2>
                    </div>
                    <a href="/products" className="w-full h-full">
                        <Image
                            src="/uploads/img/slider/slider1.jpg"
                            width={0}
                            height={0}
                            quality={100}
                            sizes="100vw"
                            alt="slider1"
                            className="w-full h-full object-cover"
                        />
                    </a>
                </SwiperSlide>
            </Swiper>
        </>
    )
}
