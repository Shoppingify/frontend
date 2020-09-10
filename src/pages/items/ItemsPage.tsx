import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
// Libs
import { useRecoilState } from 'recoil/dist'
import { v4 as uuidv4 } from 'uuid'
import client from '../../api/client'
import Item from '../../components/cards/Item'
import { itemsState } from '../../global-state/itemsState'
import { ItemType } from '../../types/items/types'

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
}

interface List {
    category: string
    items: Array<any>
}

// TODO refactor, example of a bad component. Refactor the logic into its own components
/**
 * Simple items page component
 */
function ItemsPage() {
    // Local state
    const [lists, setLists] = useRecoilState(itemsState)

    useEffect(() => {
        async function getItems() {
            try {
                const res = await client.get('items')
                setLists(res.data.data)
            } catch (e) {
                console.log('Error', e)
            }
        }
        getItems()
    }, [])

    return (
        <div className="flex flex-col h-full bg-gray-extra-light">
            <h1 className="text-4xl mb-5 px-20">Items page</h1>
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="overflow-y-auto px-20"
            >
                {lists
                    .filter((list) => list.items.length > 0)
                    .map((list: List) => (
                        <li key={uuidv4()} className="mb-5">
                            <h3 className="text-2xl font-bold">
                                {list.category}
                            </h3>
                            {list.items.length > 0 && (
                                <ul className="grid grid-cols-4 gap-5">
                                    {list.items.map((item: ItemType) => (
                                        <motion.li
                                            variants={itemVariants}
                                            key={uuidv4()}
                                        >
                                            <Item
                                                data={item}
                                                category={list.category}
                                            />
                                        </motion.li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </motion.ul>
        </div>
    )
}

export default ItemsPage
