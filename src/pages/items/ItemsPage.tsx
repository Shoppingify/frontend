import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { MdModeEdit } from 'react-icons/md'
// Libs
import { useRecoilState } from 'recoil/dist'
import { v4 as uuidv4 } from 'uuid'
import client from '../../api/client'
import Item from '../../components/cards/Item'
import CategoryTitle from '../../components/categories/CategoryTitle'
import SearchInput from '../../components/form-elements/SearchInput'
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
    category_id: number
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

    const categoryUpdated = (cat: any) => {
        const index = lists.findIndex((list) => list.category_id === cat.id)

        setLists((oldLists) => {
            const newLists = [...oldLists]
            console.log('NewLists', newLists)
            newLists[index] = { ...newLists[index], category: cat.name }
            console.log('NewLists', newLists)

            return newLists
        })
    }

    return (
        <div className="flex flex-col h-full bg-gray-extra-light">
            <div className="flex mb-5 px-20 py-4">
                <h1 className="hidden xl:block text-2xl font-bold mr-2">
                    <span className="text-primary">Shoppingify</span> allows you
                    take your shopping list wherever you go
                </h1>
                <SearchInput />
            </div>
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
                            {/* Category name component */}
                            <CategoryTitle
                                category={list.category}
                                category_id={list.category_id}
                                categoryUpdated={categoryUpdated}
                            />
                            {list.items.length > 0 && (
                                <ul
                                    style={{ marginLeft: '-12px' }}
                                    className="flex flex-wrap w-full"
                                >
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
