import React, { useEffect, useState } from 'react'

// Libs
import { motion, AnimatePresence } from 'framer-motion'

// Api client
import client from '../../../api/client'

// Global state
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { shopListDataState } from '../../../global-state/shopListState'
import { appConfigState } from '../../../global-state/atoms'

// Hooks
import useMounted from '../../../hooks/useMount'

// Components
import ShoppingListItemQuantity from './ShoppingListItemQuantity'
import { toast } from 'react-toastify'
import { useCallback } from 'react'

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
const ShoppingListItem: React.FC<PropTypes> = React.memo(
    ({ name, quantity, item_id, editing, done, catIndex, itemIndex }) => {
        // Local state
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

            const handleZeroQuantity = async () => {
                try {
                    await client.delete(
                        `/lists/${appConfig.activeListId}/items`,
                        {
                            data: {
                                item_id,
                                list_id: appConfig.activeListId,
                            },
                        }
                    )

                    // refetch list data
                    const responseItems = await client.get(
                        `lists/${appConfig.activeListId}/items`
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
            client.put(`/lists/${appConfig.activeListId}/items`, {
                item_id,
                list_id: appConfig.activeListId,
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
                    await client.put(`/lists/${appConfig.activeListId}/items`, {
                        item_id,
                        list_id: appConfig.activeListId,
                        quantity,
                        done,
                    })
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
                await client.delete(`/lists/${appConfig.activeListId}/items`, {
                    data: {
                        item_id,
                        list_id: appConfig.activeListId,
                    },
                })

                const responseItems = await client.get(
                    `lists/${appConfig.activeListId}/items`
                )

                const {
                    data: { items: itemsData },
                } = await responseItems.data

                setShopList(itemsData)
            } catch (error) {
                // TODO Handle notifications
                toast.error('An error occured')
                console.log(error)
            }
        }, [])

        return (
            <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="show"
                className="flex justify-between items-center mb-6 xl:flex-wrap group pl-2"
            >
                <label className="flex items-center relative">
                    {/** Checkbox */}
                    <AnimatePresence>
                        {!editing && (
                            <motion.input
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                type="checkbox"
                                checked={done}
                                onChange={handleCompleteStatus}
                                name="complete"
                                className="mr-2 absolute"
                            />
                        )}
                    </AnimatePresence>
                    {/** Item name */}
                    <h2
                        className={`lg:w-full xl:w-auto ${
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
            </motion.div>
        )
    }
)

export default ShoppingListItem
