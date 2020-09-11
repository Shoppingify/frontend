import React from 'react'
import { MdInsertChart, MdList, MdRefresh } from 'react-icons/md'
// Libs
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import ShoppingBasket from '../shopping-basket/ShoppingBasket'

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
            <ShoppingBasket />
        </nav>
    )
}

export default Navbar
