import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
    FaUser,
    FaHeart,
    FaShoppingCart,
    FaBars,
    FaTimes,
} from 'react-icons/fa'
import { RxSwitch } from 'react-icons/rx'
import { ThemeContext } from '../context/Theme'

const navLinks = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about-us' },
    { title: 'Contact', url: '/contact-us' },
    { title: 'Create An Account', url: '/create-account' },
    { title: 'Login', url: '/login' },
]

const iconList = [
    { icon: <FaUser /> },
    { icon: <FaHeart /> },
    { icon: <FaShoppingCart /> },
    { icon: <RxSwitch /> },
]

const bgColor = 'bg-gray-900'
const modalColor = 'bg-gray-900'

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769)
    const [showModal, setShowModal] = useState(false)
    const { toggleTheme, theme } = useContext(ThemeContext)

    // TOGGLE THEME FUNCTION
    const handleClick = () => {
        toggleTheme()
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 769)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleBarsIconClick = () => {
        toggleModal()
    }

    return (
        <>
            {!isMobile ? (
                // Laptop Navbar Code Here
                <nav className={theme ? 'bg-black' : `${bgColor}`}>
                    <div className="flex justify-between mx-auto items-center py-4 px-24">
                        <div className="text-white font-bold text-xl">
                            <Link to="/">Techie Laptops</Link>
                        </div>
                        <ul className="flex gap-8 md:gap-16 items-center justify-center text-center cursor-pointer">
                            {navLinks.map((link, index) => (
                                <li key={index} className="text-white text-sm">
                                    <Link to={link.url}>{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                        <ul className="flex text-white gap-6 items-center cursor-pointer">
                            {iconList.map((item, index) => {
                                if (index === 0) {
                                    return (
                                        <Link to="/create-account" key={index}>
                                            <div>{item.icon}</div>
                                        </Link>
                                    )
                                }
                                if (index === 1) {
                                    return (
                                        <Link to="/like-items" key={index}>
                                            <div>{item.icon}</div>
                                        </Link>
                                    )
                                }
                                if (index === 2) {
                                    return (
                                        <Link to="/cart" key={index}>
                                            <div>{item.icon}</div>
                                        </Link>
                                    )
                                }
                                if (index === 3) {
                                    return (
                                        <div onClick={handleClick} key={index}>
                                            {item.icon}
                                        </div>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </nav>
            ) : (
                // Mobile Navbar Code Here
                <nav className={`h-screen ${bgColor} py-4 px-4`}>
                    <div className="mx-auto flex justify-between items-center ">
                        <div className="text-white font-bold text-xl">
                            Techie Laptop
                        </div>
                        <div className="flex justify-end items-center gap-6 text-white cursor-pointer">
                            {iconList.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={
                                        index === iconList.length - 1
                                            ? handleBarsIconClick
                                            : null
                                    }
                                >
                                    {item.icon}
                                </div>
                            ))}
                            <FaBars
                                onClick={handleBarsIconClick}
                                className="text-white cursor-pointer"
                            />
                        </div>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 flex justify-center items-center">
                            <div className={`absolute inset-0 ${modalColor}`} />
                            <FaTimes
                                className="absolute top-6 right-4 text-white cursor-pointer"
                                onClick={toggleModal}
                                style={{ fontSize: '16px' }}
                            />
                            <div className="relative bg-gray-900 w-full">
                                <div className="flex flex-col gap-8 items-center justify-center h-full">
                                    {navLinks.map((link, index) => (
                                        <span
                                            key={index}
                                            className="text-white font-light text-2xl cursor-pointer"
                                        >
                                            {link.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            )}{' '}
        </>
    )
}
