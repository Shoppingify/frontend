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

// state
import { useRecoilState } from 'recoil'
import { shopListDataState } from '../../../global-state/shopListState'
import { appConfigState } from '../../../global-state/atoms'

// Hooks
import useMounted from '../../../hooks/useMount'

// Components
import ShoppingListItem from '../shopping-list__item/ShoppingListItem'
import ShoppingListTitle from './ShoppingListTitle'
import ShoppingListStatusModal from './ShoppingListStatusModal'
import Heading from '../../heading/Heading'

// Name generator
const nameConfig: Config = {
    dictionaries: [adjectives, colors, names],
    length: 3,
    separator: ' ',
    style: 'capital',
}

/**
 * Main shopping list component
 */
const ShoppingList: React.FC = () => {
    // Global state
    const [shopList, setShopList] = useRecoilState(shopListDataState)
    const [appConfig, setAppConfig] = useRecoilState(appConfigState)

    // Local state
    const [editing, setEditing] = useState(false)

    // For shopping list title edit
    const [shopListName, setShopListName] = useState<string>('')
    const [originalShopListName, setOriginalShopListName] = useState('')

    const mounted = useMounted()

    /**
     * Component mounted effect
     */
    useEffect(() => {
        async function initialData() {
            try {
                const response = await client.get('lists?status=active')
                const { data: listData } = await response.data

                if (listData.length === 0) {
                    // No Active list
                    // Create a new list
                    createNewList()
                } else {
                    // Active list found
                    const activeList = listData[0]
                    const activeListId = activeList.id

                    // Set global active list id
                    setAppConfig((current: any) => ({
                        ...current,
                        activeListId,
                    }))
                    // Set local state for shopping list name
                    setShopListName(activeList.name)

                    // Another request to fetch items
                    const responseItems = await client.get(
                        `lists/${activeListId}/items`
                    )

                    const {
                        data: { items: itemsData },
                    } = await responseItems.data

                    setShopList(itemsData)
                }
            } catch (error) {
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
        if (!mounted.current) return

        if (editing) {
            setOriginalShopListName(shopListName)
        }

        if (!editing) {
            if (!(shopListName === originalShopListName)) {
                client.put(`lists/${appConfig.activeListId}`, {
                    name: shopListName,
                })
            }
        }
    }, [editing])

    /**
     * Handle list status change
     */
    const handleListStatus = async (status: string) => {
        try {
            // Change the status of the currently active list
            await client.put(`/lists/${appConfig.activeListId}`, {
                status,
            })

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
    const createNewList = useCallback(async () => {
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
            } = await responseItems.data

            /**
             * Setting local state
             */
            // Set global active list id
            setAppConfig((current: any) => ({
                ...current,
                activeListId: createdList.id,
            }))
            // Set local state for shopping list name
            setShopListName(createdList.name)
            // Set items to local shop list state
            setShopList(itemsData)
        } catch (error) {
            // TODO handle notifications
            console.log(error)
        }
    }, [])

    return (
        <div className="h-full">
            <ShoppingListTitle
                editing={editing}
                setShopListName={(e) => setShopListName(e.target.value)}
                setEditing={() => setEditing((current: boolean) => !current)}
                shopListName={shopListName}
            />
            {shopList.map((category: any, index: number) => (
                <div key={index} className="mb-16">
                    <Heading level={3} className="text-gray-light mb-6">
                        {category.category}
                    </Heading>
                    {category.items.map((item: any, indexItem: number) => {
                        return (
                            <ShoppingListItem
                                key={`${item.name}__${indexItem}`}
                                quantity={item.quantity}
                                name={item.name}
                                category={item.categoryName}
                                item_id={item.id}
                                editing={editing}
                                done={item.done}
                                catIndex={index}
                                itemIndex={indexItem}
                            />
                        )
                    })}
                </div>
            ))}
            <div className="pb-40">
                {/** This element makes the list overflow if bigger than sidebar */}
            </div>
            <AnimatePresence>
                {!editing && (
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
    )
}

export default ShoppingList
