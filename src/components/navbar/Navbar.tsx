import React, { useEffect } from 'react'
import { MdInsertChart, MdList, MdRefresh } from 'react-icons/md'
// Libs
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import ShoppingBasket from '../shopping-basket/ShoppingBasket'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css' // optional for styling

/**
 * Simple navbar component
 */
// TODO refactor
const Navbar = () => {
    useEffect(() => {
        tippy('[data-tippy-content]', {
            placement: 'right',
            offset: [0, -10],
        })
    }, [])
    return (
        <nav className="w-24 flex-none flex flex-col items-center mt-10">
            <img src={logo} alt="logo" />
            <ul className="flex flex-col w-full h-full justify-center items-center">
                <li className="w-full">
                    <NavLink
                        data-tippy-content="items"
                        className="navbar__item"
                        to="/items"
                        activeClassName="active"
                    >
                        <MdList />
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        data-tippy-content="history"
                        className="navbar__item"
                        to="/history"
                        activeClassName="active"
                    >
                        <MdRefresh />
                    </NavLink>
                </li>
                <li className="w-full">
                    <NavLink
                        data-tippy-content="statistics"
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
