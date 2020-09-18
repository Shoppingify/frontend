import React, { useEffect } from 'react'

// Global state
import { useRecoilState } from 'recoil'
import {
    ADD_NEW_ITEM,
    ADD_SHOPPING_LIST,
    SHOW_ITEM,
    SHOW_SHOPPING_LIST,
    sidebarState,
    sidebarHistoryState,
} from '../../global-state/sidebarState'

// Components
import ShoppingList from '../shopping-list/shopping-list__main/ShoppingList'
import AddItemSidebar from '../item-sidebars/AddItemSidebar'
import ShowItemSidebar from '../item-sidebars/ShowItemSidebar'
import AddNewItem from '../add-item/AddNewItemCTA'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Sidebar of the app
 */
function Sidebar() {
    const [sidebarType, setSidebarType] = useRecoilState(sidebarState)
    const [sidebarHistory, setSidebarHistory] = useRecoilState(
        sidebarHistoryState
    )

    const selectSidebar = () => {
        switch (sidebarType) {
            case ADD_SHOPPING_LIST:
                return (
                    <motion.div
                        key="shoppinglistkey"
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        exit={{ x: 500 }}
                    >
                        <ShoppingList />
                    </motion.div>
                )
            case ADD_NEW_ITEM:
                return (
                    <motion.div
                        key="additemkey"
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        exit={{ x: 500 }}
                    >
                        <AddItemSidebar />
                    </motion.div>
                )
            case SHOW_ITEM:
                return (
                    <motion.div
                        key="showitemkey"
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        exit={{ x: 500 }}
                    >
                        <ShowItemSidebar />
                    </motion.div>
                )
            default:
                return (
                    <motion.div key="shoppinglistkey" exit={{ x: 500 }}>
                        <ShoppingList />
                    </motion.div>
                )
        }
    }

    useEffect(() => {
        setSidebarHistory((history) => [...history, sidebarType])
        console.log('sidebarHistory', sidebarHistory)
    }, [sidebarType])

    return (
        <div
            className={`hidden lg:block w-sidebar relative flex-none overflow-y-auto ${
                sidebarType === ADD_SHOPPING_LIST ||
                sidebarType === SHOW_SHOPPING_LIST
                    ? 'bg-primary-light'
                    : 'bg-white'
            }`}
        >
            {/* <ShoppingList /> */}
            <AnimatePresence exitBeforeEnter>{selectSidebar()}</AnimatePresence>
        </div>
    )
}

export default Sidebar
