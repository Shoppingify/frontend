import React, { useEffect } from 'react'

// Libs
import { NavLink } from 'react-router-dom'
import { MdInsertChart, MdList, MdRefresh } from 'react-icons/md'
import tippy from 'tippy.js'

// Styles
import 'tippy.js/dist/tippy.css' // optional for styling

// Components
import ShoppingBasket from '../shopping-basket/ShoppingBasket'
import UserMenu from './UserMenu'
import { useSetRecoilState } from 'recoil'
import { sidebarMobileShowState } from '../../global-state/sidebarState'

/**
 * Simple navbar component
 */
const Navbar = () => {
    const setShowMobileSidebar = useSetRecoilState(sidebarMobileShowState)
    /**
     * Effect runs on component mount
     */
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
        <nav className="w-16 md:w-24 flex-none flex flex-col items-center my-2 lg:my-10">
            <UserMenu />
            <ul className="flex flex-col w-full h-full justify-center items-center">
                {links.map((link, index: number) => (
                    <li className="w-full" key={index}>
                        <NavLink
                            className="navbar__item lg:py-2"
                            data-tippy-content={link.name}
                            to={link.to}
                            onClick={() => setShowMobileSidebar(false)}
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
