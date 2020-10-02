import React, { useEffect, useRef, useState } from 'react'

// Libs
import { motion, AnimatePresence } from 'framer-motion'

// Api client
import client from '../../../api/client'

// Global state
import { useSetRecoilState, useRecoilValue } from 'recoil'
import {
    shopListState,
    shopListInfoState,
} from '../../../global-state/shopListState'

// Components
import ShoppingListItemQuantity from './ShoppingListItemQuantity'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import Checkbox from '../../form-elements/Checkbox'

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

/**
 *  A component that displays single item in the shoping list in the sidebar
 */
const ShoppingListItem: React.FC<PropTypes> = React.memo(
    ({ name, quantity, item_id, editing, done, catIndex, itemIndex }) => {
        // Local state
        const [mounted, setMounted] = useState(false)

        // Global state - read only
        const shopListInfo = useRecoilValue(shopListInfoState)
        const setShopList = useSetRecoilState(shopListState)

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

            const handleZeroQuantity = async () => {
                try {
                    await client.delete(
                        `/lists/${shopListInfo.activeListId}/items`,
                        {
                            data: {
                                item_id,
                                list_id: shopListInfo.activeListId,
                            },
                        }
                    )

                    // refetch list data
                    const responseItems = await client.get(
                        `lists/${shopListInfo.activeListId}/items`
                    )

                    const {
                        data: { items: itemsData },
                    } = await responseItems.data

                    setShopList(itemsData)
                } catch (error) {
                    // TODO Handle notifications
                    console.log(error)
                }
            }

            // Handle 0 quantity, remove item from shopping list
            if (quantity === 0) {
                handleZeroQuantity()
                return
            }

            // If quantity is higher than 0 update the shop list, no need for app state update since the app state shop list update triggers this effect
            client.put(`/lists/${shopListInfo.activeListId}/items`, {
                item_id,
                list_id: shopListInfo.activeListId,
                quantity,
                done,
            })
        }, [quantity])

        /**
         * Effect runs on done status change
         */
        useEffect(() => {
            if (!mounted) return

            const updateDBList = async () => {
                try {
                    await client.put(
                        `/lists/${shopListInfo.activeListId}/items`,
                        {
                            item_id,
                            list_id: shopListInfo.activeListId,
                            quantity,
                            done,
                        }
                    )
                } catch (error) {
                    toast.error('An error occured')
                    console.log(error)
                }
            }

            updateDBList()
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
        const handleItemDelete = useCallback(async () => {
            try {
                await client.delete(
                    `/lists/${shopListInfo.activeListId}/items`,
                    {
                        data: {
                            item_id,
                            list_id: shopListInfo.activeListId,
                        },
                    }
                )

                const responseItems = await client.get(
                    `lists/${shopListInfo.activeListId}/items`
                )

                const {
                    data: { items: itemsData },
                } = await responseItems.data
                toast.warn('Item removed from shopping list')
                setShopList(itemsData)
            } catch (error) {
                toast.error('An error occured')
                console.log(error)
            }
        }, [])

        return (
            <div className="flex justify-between items-center mb-6 xl:flex-wrap group relative">
                <label
                    className={`flex items-center relative pl-4 focus:border-black ${
                        editing ? 'w-1/3' : ''
                    }`}
                >
                    {/** Checkbox */}
                    <AnimatePresence>
                        {!editing && (
                            <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -10, opacity: 0 }}
                                className="mr-2 absolute left-0"
                            >
                                <Checkbox
                                    checked={done}
                                    onChange={handleCompleteStatus}
                                    className="font-semibold"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/** Item name */}
                    <h2
                        className={`lg:w-full xl:w-auto font-semibold ${
                            done ? 'line-through' : undefined
                        }`}
                        style={{
                            transition: 'all 0.3s ease-out',
                            transform: `translateX(${editing ? 0 : '20px'})`,
                        }}
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
            </div>
        )
    }
)

export default ShoppingListItem
