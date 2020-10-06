import React, { useEffect } from 'react'

// Global state
import { useRecoilState, useRecoilValue } from 'recoil'
import {
    ADD_NEW_ITEM,
    ADD_SHOPPING_LIST,
    SHOW_ITEM,
    SHOW_SHOPPING_LIST,
    sidebarState,
    sidebarHistoryState,
    sidebarMobileShowState,
} from '../../global-state/sidebarState'

// Components
import ShoppingList from '../shopping-list/shopping-list__main/ShoppingList'
import AddItemSidebar from '../item-sidebars/AddItemSidebar'
import ShowItemSidebar from '../item-sidebars/ShowItemSidebar'

// Libs
import { AnimatePresence } from 'framer-motion'

/**
 * Sidebar of the app
 */
function Sidebar() {
    const [sidebarType, setSidebarType] = useRecoilState(sidebarState)
    const [sidebarHistory, setSidebarHistory] = useRecoilState(
        sidebarHistoryState
    )
    const [sidebarShow, setSidebarShow] = useRecoilState(sidebarMobileShowState)

    const selectSidebar = () => {
        switch (sidebarType) {
            case ADD_SHOPPING_LIST:
                return <ShoppingList />
            case ADD_NEW_ITEM:
                return <AddItemSidebar />
            case SHOW_ITEM:
                return <ShowItemSidebar />
            default:
                return <ShoppingList />
        }
    }

    useEffect(() => {
        setSidebarHistory((history) => [...history, sidebarType])
        console.log('sidebarHistory', sidebarHistory)
    }, [sidebarType])

    return (
        <div
            className={`w-sidebar-mobile absolute right-0 h-screen md:w-sidebar md:relative md:transform-none md:block flex-none overflow-y-auto overflow-x-hidden transform transition-transform duration-300 ease-in-out ${
                sidebarType === ADD_SHOPPING_LIST ||
                sidebarType === SHOW_SHOPPING_LIST
                    ? 'bg-primary-light'
                    : 'bg-white'
            } ${sidebarShow ? 'translate-x-0' : 'translate-x-full'}`}
        >
            {/* <ShoppingList /> */}
            <AnimatePresence exitBeforeEnter>{selectSidebar()}</AnimatePresence>
        </div>
    )
}

export default Sidebar
