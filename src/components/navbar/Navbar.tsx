import React, { useEffect, useMemo } from 'react'

// Libs
import { NavLink } from 'react-router-dom'
import { MdInsertChart, MdList, MdRefresh } from 'react-icons/md'
import tippy from 'tippy.js'

// Styles
import 'tippy.js/dist/tippy.css' // optional for styling

// Assets
import logo from '../../assets/logo.svg'

// Components
import ShoppingBasket from '../shopping-basket/ShoppingBasket'

/**
 * Simple navbar component
 */
const Navbar = () => {
    useEffect(() => {
        tippy('[data-tippy-content]', {
            placement: 'right',
            offset: [0, -10],
        })
    }, [])

    const links = [
        {
            icon: () => <MdList />,
            to: '/items',
            name: 'items',
        },
        {
            icon: () => <MdRefresh />,
            to: '/history',
            name: 'history',
        },
        {
            icon: () => <MdInsertChart />,
            to: '/statistics',
            name: 'statistics',
        },
    ]
    return (
        <nav className="w-24 flex-none flex flex-col items-center mt-10">
            <img src={logo} alt="logo" />
            <ul className="flex flex-col w-full h-full justify-center items-center">
                {links.map((link, index: number) => (
                    <li className="w-full" key={index}>
                        <NavLink
                            className="navbar__item"
                            data-tippy-content={link.name}
                            to={link.to}
                        >
                            {
                                //@ts-ignore TODO Type
                                link.icon()
                            }
                        </NavLink>
                    </li>
                ))}
            </ul>
            <ShoppingBasket />
        </nav>
    )
}

export default Navbar
