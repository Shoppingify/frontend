import React, { useEffect } from 'react'

// Libs
import { Link, useLocation } from 'react-router-dom'
import {
    AiOutlineUnorderedList,
    AiOutlineReload,
    AiOutlineShoppingCart,
} from 'react-icons/ai'
import { IoMdStats } from 'react-icons/io'
import logo from '../../assets/logo.svg'
/**
 * Simple navbar component
 */
// TODO refactor
const Navbar = () => {
    const location = useLocation()

    useEffect(() => {
        console.log('location', location)
    }, [location])

    return (
        <nav className="w-24 flex-none flex flex-col items-center mt-10">
            <img src={logo} alt="logo" />
            <ul className="flex flex-col w-full h-full justify-center items-center">
                <li
                    className={`navbar__item ${
                        location && location.pathname === '/items'
                            ? 'active'
                            : ''
                    }`}
                >
                    <Link to="/items">
                        <AiOutlineUnorderedList />
                    </Link>
                </li>
                <li
                    className={`navbar__item ${
                        location && location.pathname === '/history'
                            ? 'active'
                            : ''
                    }`}
                >
                    <Link to="/history">
                        <AiOutlineReload />
                    </Link>
                </li>
                <li
                    className={`navbar__item ${
                        location && location.pathname === '/statistics'
                            ? 'active'
                            : ''
                    }`}
                >
                    <Link to="/statistics">
                        <IoMdStats />
                    </Link>
                </li>
            </ul>
            <div className="w-16 h-16 flex justify-center items-center relative">
                <div
                    style={{ top: '4px', right: '4px' }}
                    className="absolute w-5 h-5 bg-danger rounded-lg text-white flex justify-center items-center text-sm "
                >
                    3
                </div>
                <div className="rounded-full flex justify-center items-center bg-primary w-10 h-10  text-white text-xl">
                    <AiOutlineShoppingCart />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
