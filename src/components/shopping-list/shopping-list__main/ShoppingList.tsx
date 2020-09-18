import React, { useEffect, useState, useCallback } from 'react'

// Api client
import client from '../../../api/client'

// Libs
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'

// state
import { useRecoilValue } from 'recoil'
import {
    shopListState,
    shopListInfoState,
} from '../../../global-state/shopListState'

// Components
import ShoppingListTitle from './ShoppingListTitle'
import ShoppingListStatusModal from './ShoppingListStatusModal'
import AddNewItem from '../../add-item/AddNewItemCTA'
import RenderShopList from './RenderShopList'

// Types
import RenderNoItems from './RenderNoItems'
import useCreateNewShoppingList from '../../../hooks/useCreateNewShoppingList'

/**
 * Main shopping list component
 */
const ShoppingList: React.FC = React.memo(() => {
    // Global state
    const shopList = useRecoilValue(shopListState)
    const shopListInfo = useRecoilValue(shopListInfoState)

    // Local state
    const [editing, setEditing] = useState<boolean>(false)

    // For shopping list title edit
    const [shopListName, setShopListName] = useState<string>('')
    const [originalShopListName, setOriginalShopListName] = useState<string>('')

    // Component mounted
    const [mounted, setMounted] = useState<boolean>(false)

    // Hooks
    const createNewList = useCreateNewShoppingList()

    useEffect(() => {
        setShopListName(shopListInfo.name)
    }, [shopListInfo])

    /**
     * Component mounted effect
     */
    useEffect(() => {
        setMounted(true)
        return () => console.log('shopping list unmounted')
    }, [])

    /**
     * Effect runs on editing local state change
     */
    useEffect(() => {
        if (!mounted) return

        if (editing) {
            setOriginalShopListName(shopListName)
        }

        if (!editing) {
            if (!(shopListName === originalShopListName)) {
                client
                    .put(`lists/${shopListInfo.activeListId}`, {
                        name: shopListName,
                    })
                    .then(() => toast.info('Active shopping list name changed'))
            }
        }
    }, [editing])

    /**
     * Handle list status change
     */
    const handleListStatus = async (status: string) => {
        try {
            // Change the status of the currently active list
            await client.put(`/lists/${shopListInfo.activeListId}`, {
                status,
            })

            if (status === 'canceled') {
                toast.warning(`Shopping list was ${status}`)
            } else {
                toast.info(`Shopping list was ${status}`)
            }

            // After status is updated create a new list
            createNewList()
        } catch (error) {
            // TODO handle notifications
            console.log(error)
        }
    }

    // Functions that won't change during component lifecycle
    /**
     * Handles state of editing
     */
    const handleSetEditing = useCallback(
        () => setEditing((current: boolean) => !current),
        []
    )

    /**
     * Handles setting of shop list name
     */
    const handleSetShopListName = useCallback(
        (e) => setShopListName(e.target.value),
        []
    )

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-auto overflow-y-auto">
                <div className="flex flex-col h-full p-8 overflow-y-auto">
                    <AddNewItem />
                    <ShoppingListTitle
                        editing={editing}
                        setShopListName={handleSetShopListName}
                        setEditing={handleSetEditing}
                        shopListName={shopListName}
                    />
                    <AnimatePresence>
                        {shopList.length === 0 ? (
                            <RenderNoItems />
                        ) : (
                            <RenderShopList editing={editing} />
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex-none">
                <AnimatePresence>
                    {!editing && shopList.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <ShoppingListStatusModal
                                handleListStatus={handleListStatus}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
})

export default ShoppingList
