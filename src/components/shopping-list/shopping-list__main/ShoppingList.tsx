import React, { useEffect, useState, useCallback } from 'react'

// Api client
import client from '../../../api/client'

// Libs
import {
    uniqueNamesGenerator,
    Config,
    adjectives,
    colors,
    names,
} from 'unique-names-generator'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'react-toastify'

// state
import { useRecoilState, useSetRecoilState } from 'recoil'
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
import { ItemType } from '../../../types/items/types'
import { shopListInfoStateInterface } from '../../../types/state/shoppingListTypes'
import { historyListsRefreshState } from '../../../global-state/miscState'
import RenderNoItems from './RenderNoItems'

// Name generator
const nameConfig: Config = {
    dictionaries: [adjectives, colors, names],
    length: 3,
    separator: ' ',
    style: 'capital',
}

// Types
type activeListData = {
    created_at: string
    id: number
    name: string
    status: 'active' | 'complete' | 'canceled'
    updated_at: string
    user_id: number
}

/**
 * Main shopping list component
 */
const ShoppingList: React.FC = React.memo(() => {
    // Global state
    const [shopList, setShopList] = useRecoilState(shopListState)
    const [shopListInfo, setShopListInfoState] = useRecoilState(
        shopListInfoState
    )
    const setHistoryListsRefresh = useSetRecoilState(historyListsRefreshState)

    // Local state
    const [editing, setEditing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    // For shopping list title edit
    const [shopListName, setShopListName] = useState<string>('')
    const [originalShopListName, setOriginalShopListName] = useState<string>('')

    // Component mounted
    const [mounted, setMounted] = useState<boolean>(false)

    /**
     * Component mounted effect
     */
    useEffect(() => {
        setMounted(true)
        /**
         * Fetches initial list data
         */
        async function initialData() {
            try {
                setLoading(true)
                const response = await client.get('lists?status=active')
                const {
                    data: listData,
                }: { data: Array<activeListData> } = await response.data

                if (listData.length === 0) {
                    // No Active list
                    // Create a new list
                    createNewList()
                } else {
                    // Active list found
                    const activeList = listData[0]
                    const activeListId = activeList.id

                    // Set global active list id
                    setShopListInfoState(
                        (current: shopListInfoStateInterface) => ({
                            ...current,
                            activeListId,
                            status: activeList.status,
                        })
                    )
                    // Set local state for shopping list name
                    setShopListName(activeList.name)

                    // Another request to fetch items
                    const responseItems = await client.get(
                        `lists/${activeListId}/items`
                    )

                    const {
                        data: { items: itemsData },
                    }: {
                        data: { items: ItemType[] }
                    } = await responseItems.data
                    setShopList(itemsData)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                toast.error('There was an error fetching active list')
                // TODO handle notifications
                console.log(error)
            }
        }

        initialData()
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

    /**
     * Creates a new list and sets local state to that list
     */
    const createNewList = async () => {
        try {
            // POST new list with a random name
            const responseNewList = await client.post('/lists', {
                name: uniqueNamesGenerator(nameConfig),
            })

            // Store created list info in variable
            const createdList = await responseNewList.data.data.list

            // Fetch items of this list
            const responseItems = await client.get(
                `lists/${createdList.id}/items`
            )
            // Store items
            const {
                data: { items: itemsData },
            }: {
                data: { items: ItemType[] }
            } = await responseItems.data

            /**
             * Setting local state
             */
            // Set global active list id
            setShopListInfoState((current: shopListInfoStateInterface) => ({
                ...current,
                activeListId: createdList.id,
                status: createdList.status,
            }))
            // Refresh history list
            setHistoryListsRefresh((current) => ({ ...current, refresh: true }))
            // Set local state for shopping list name
            setShopListName(createdList.name)
            // Set items to local shop list state
            setShopList(itemsData)

            toast.success(`Created new active list: ${createdList.name}`)
        } catch (error) {
            // TODO handle notifications
            toast.error('An error occured')
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
            <div className={`overflow-y-auto flex-auto p-8`}>
                <div className="flex flex-col h-full">
                    <AddNewItem />
                    <ShoppingListTitle
                        editing={editing}
                        setShopListName={handleSetShopListName}
                        setEditing={handleSetEditing}
                        shopListName={shopListName}
                    />
                    {shopList.length === 0 && !loading ? (
                        <RenderNoItems />
                    ) : (
                        <RenderShopList editing={editing} />
                    )}
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
