import React from 'react'
import {
    MdInsertChart,
    MdList,
    MdRefresh,
    MdShoppingCart,
} from 'react-icons/md'
// Libs
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'

/**
 * Simple navbar component
 */
// TODO refactor
const Navbar = () => {
    return (
        <nav className="w-24 flex-none flex flex-col items-center mt-10">
            <img src={logo} alt="logo" />
            <ul className="flex flex-col w-full h-full justify-center items-center">
                <li className="w-full">
                    <NavLink
                        className="navbar__item"
                        to="/items"
                        activeClassName="active"
                    >
                        <MdList />
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        className="navbar__item"
                        to="/history"
                        activeClassName="active"
                    >
                        <MdRefresh />
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        className="navbar__item"
                        to="/statistics"
                        activeClassName="active"
                    >
                        <MdInsertChart />
                    </NavLink>
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
                    <MdShoppingCart />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
