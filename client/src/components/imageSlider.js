import React, { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'

export default function ImageSlider({ photos }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    return (
        <div className="flex justify-center items-center">
            {photos.map((url, index) => (
                <div
                    className={`${
                        index === currentSlide ? 'block' : 'hidden'
                    } h-80 bg-gray-200`}
                    key={index}
                >
                    {' '}
                    <img
                        src={url}
                        alt={`Slide ${index + 1}`}
                        className="w-auto h-50"
                    />
                </div>
            ))}
        </div>
    )
}
