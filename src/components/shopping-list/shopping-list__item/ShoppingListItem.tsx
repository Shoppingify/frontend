import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { shopListDataState } from '../../../global-state/shopListState'
import { MdRemove, MdAdd, MdDelete } from 'react-icons/md'
import { ItemType } from '../../../types/items/types'
import client from '../../../api/client'
import { appConfigState } from '../../../global-state/atoms'
import ShoppingListItemQuantity from './ShoppingListItemQuantity'

// Prop Types
interface PropTypes {
    name: string
    quantity: number
    category: string
    item_id: number
    editing: boolean
    done: boolean
    catIndex: number
    itemIndex: number
}

// Framer motion variants - animations
const itemVariants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
    },
}
// TODO refactor into components
/**
 *  A component that displays single item in the shoping list in the sidebar
 *
 *  @param {string} name
 *  @param {number} quantity
 *  @param {id} number
 *  @param {string} category
 *  @param {boolean} editing
 */
const ShoppingListItem: React.FC<PropTypes> = ({
    name,
    quantity,
    item_id,
    category,
    editing,
    done,
    catIndex,
    itemIndex,
}) => {
    useEffect(() => {
        return () => {
            console.log('Unmounting single item')
        }
    }, [])

    // Local state
    const [complete, setComplete] = useState(done)
    const [mounted, setMounted] = useState(false)

    // Global state - read only
    const appConfig = useRecoilValue(appConfigState)
    const setShopList = useSetRecoilState(shopListDataState)

    /**
     * Effect runs on component mount
     */
    useEffect(() => {
        setMounted(true)
    }, [])

    /**
     * Effect runs on quantity change
     */
    useEffect(() => {
        if (!mounted) return

        // Handle 0 quantity, remove item from shopping list
        if (quantity === 0) {
            client
                .delete(`/lists/${appConfig.activeListId}/items`, {
                    data: {
                        item_id,
                        list_id: appConfig.activeListId,
                    },
                })
                .then(async () => {
                    // refetch list data
                    const responseItems = await client.get(
                        `lists/${appConfig.activeListId}/items`
                    )

                    const {
                        data: { items: itemsData },
                    } = await responseItems.data

                    setShopList(itemsData)
                })

            return
        }

        // If quantity is high than 0 update the shop list, no need for app state update since the app state shop list update triggers this effect
        client.put(`/lists/${appConfig.activeListId}/items`, {
            item_id,
            list_id: appConfig.activeListId,
            quantity,
            done: false,
        })
    }, [quantity])

    /**
     * Effect runs on done status change
     */
    useEffect(() => {
        if (!mounted) return

        client.put(`/lists/${appConfig.activeListId}/items`, {
            item_id,
            list_id: appConfig.activeListId,
            quantity,
            done,
        })
    }, [done])

    /**
     * Handles increment or decrement of the item quantity
     * If inc is true add to quantity else remove one
     *
     * This sets local shop list update, which triggers PUT method
     *
     * @param {boolean} inc
     *  If true inc else dec
     */
    const handleInOrDecBtnClick = (inc: boolean) => {
        //@ts-ignore
        setShopList((current: any) => {
            const newItems = JSON.parse(JSON.stringify(current))

            newItems[catIndex].items[itemIndex].quantity += inc ? 1 : -1

            return newItems
        })
    }

    /**
     * Handles the change of complete status
     * First change local shop list state which then triggers the
     */
    const handleCompleteStatus = () => {
        // Update complete property of current item
        setShopList((current: any) => {
            const tempShopList = JSON.parse(JSON.stringify(current))

            // Find the item in current state and update its done status
            tempShopList[catIndex].items[itemIndex].done = !tempShopList[
                catIndex
            ].items[itemIndex].done

            return tempShopList
        })
    }

    /**
     * Handles the deletion of the item from the list
     * After DELETE method is finished, refetch list data and update app shoplist state
     */
    const handleItemDelete = () => {
        client
            .delete(`/lists/${appConfig.activeListId}/items`, {
                data: {
                    item_id,
                    list_id: appConfig.activeListId,
                },
            })
            .then(async () => {
                const responseItems = await client.get(
                    `lists/${appConfig.activeListId}/items`
                )

                const {
                    data: { items: itemsData },
                } = await responseItems.data

                setShopList(itemsData)
            })
    }

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="flex justify-between items-center mb-6 xl:flex-wrap group"
        >
            <label className="flex items-center">
                {/** Checkbox */}
                {!editing && (
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={handleCompleteStatus}
                        name="complete"
                        className="mr-2"
                    />
                )}
                {/** Item name */}
                <h2
                    className={`lg:w-full xl:w-auto ${
                        done ? 'line-through' : undefined
                    }`}
                >
                    {name}
                </h2>
            </label>
            <ShoppingListItemQuantity
                quantity={quantity}
                editing={editing}
                handleItemDelete={handleItemDelete}
                handleInOrDecBtnClick={handleInOrDecBtnClick}
            />
        </motion.div>
    )
}

export default ShoppingListItem
