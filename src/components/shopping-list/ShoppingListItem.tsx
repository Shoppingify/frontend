import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { shopListDataState } from '../../global-state/shopListState'
import { MdRemove, MdAdd, MdDelete } from 'react-icons/md'
import { ItemType } from '../../types/items/types'
import client from '../../api/client'
import { appConfigState } from '../../global-state/atoms'

// Prop Types
interface PropTypes {
    name: string
    quantity: number
    category: string
    id: number
    editing: boolean
    done: boolean
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

const buttonVariants = {
    rest: {
        opacity: 0,
        width: 0,
    },
    hover: {
        opacity: 1,
        width: 'auto',
    },
}

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
    id,
    category,
    editing,
    done,
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

    function handleInOrDecBtnClick(incOrDec: string) {
        //@ts-ignore
        // TODO refactor
        setShopList((current: any) => {
            const newItems = JSON.parse(JSON.stringify(current))

            // Find the item in current state
            const catIndex = newItems.findIndex(
                (x: any) => x.category === category
            )
            const itemIndex = newItems[catIndex].items.findIndex(
                (x: ItemType) => x.id === id
            )

            newItems[catIndex].items[itemIndex].quantity +=
                incOrDec === 'inc' ? 1 : -1

            return newItems
        })
    }

    function handleItemDelete() {
        client
            .delete(`/lists/${appConfig.activeListId}/items`, {
                data: {
                    item_id: id,
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
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        // Handle 0 quantity, remove it
        if (quantity === 0) {
            client
                .delete(`/lists/${appConfig.activeListId}/items`, {
                    data: {
                        item_id: id,
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

        client.put(`/lists/${appConfig.activeListId}/items`, {
            item_id: id,
            list_id: appConfig.activeListId,
            quantity,
            done: false,
        })
    }, [quantity])

    useEffect(() => {
        if (!mounted) return
        client.put(`/lists/${appConfig.activeListId}/items`, {
            item_id: id,
            list_id: appConfig.activeListId,
            quantity,
            done: complete,
        })
    }, [complete])

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
                        checked={complete}
                        onChange={() =>
                            setComplete((current: boolean) => !current)
                        }
                        name="complete"
                        className="mr-2"
                    />
                )}
                {/** Item name */}
                <h2
                    className={`lg:w-full xl:w-auto ${
                        complete ? 'line-through' : undefined
                    }`}
                >
                    {name}
                </h2>
            </label>
            {/** Container for edit buttons and quantity */}
            <motion.div
                initial="rest"
                whileHover={editing ? 'hover' : ''}
                animate="rest"
                className={`flex ${
                    editing ? 'hover:bg-white' : undefined
                } rounded-12 overflow-hidden`}
            >
                {/** Delete button */}
                <motion.button
                    disabled={!editing}
                    variants={buttonVariants}
                    className="bg-primary rounded-12 p-1"
                    style={{
                        pointerEvents: editing ? 'all' : 'none',
                    }}
                    onClick={handleItemDelete}
                >
                    <MdDelete color="#fff" size={24} />
                </motion.button>
                {/** Quantity increment button */}
                <motion.button
                    variants={buttonVariants}
                    onClick={() => handleInOrDecBtnClick('dec')}
                    className="mx-2"
                    disabled={!editing}
                    style={{
                        pointerEvents: editing ? 'all' : 'none',
                    }}
                >
                    <MdRemove color="#F9A109" size={24} />
                </motion.button>
                {/** H3 that displays quantitx */}
                <h3 className="rounded-24 border-primary border-2 text-primary font-bold text-sm px-4 py-2 my-1">
                    <span>{quantity}</span>
                    {quantity > 1 ? ' pcs' : ' pc'}
                </h3>
                {/** Quantity decrement button */}
                <motion.button
                    variants={buttonVariants}
                    onClick={() => handleInOrDecBtnClick('inc')}
                    className="mx-2"
                    disabled={!editing}
                    style={{
                        pointerEvents: editing ? 'all' : 'none',
                    }}
                >
                    <MdAdd color="#F9A109" size={24} />
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default ShoppingListItem
