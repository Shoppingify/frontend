import React, { useEffect, useState } from 'react'

// Libs
import { useRecoilValue, useRecoilState } from 'recoil/dist'
import { userState } from '../../App'
import { v4 as uuidv4 } from 'uuid'
import Item from '../../components/cards/Item'
import { motion } from 'framer-motion'
import client from '../../api/client'
import { userItemsState } from '../../global-state/atoms'

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
    const user = useRecoilValue(userState)

    // Local state
    // const [lists, setLists] = useState([])
    const [lists, setLists] = useRecoilState(userItemsState)

    useEffect(() => {
        async function getItems() {
            const res = await client.get('items')
            console.log('res', res.data)
            setLists(res.data.data)
        }
        getItems()
    }, [])

    return (
        <div className="bg-gray-extra-light px-20">
            <h1 className="text-4xl mb-5">Items page</h1>
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {lists.map((list: List) => (
                    <li key={uuidv4()} className="mb-5">
                        <h3 className="text-2xl font-bold">{list.category}</h3>
                        {list.items.length > 0 && (
                            <ul className="grid grid-cols-4 gap-5">
                                {list.items.map((item: any) => (
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
