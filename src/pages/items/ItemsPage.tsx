import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
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
    const [itemsWithCategories, setItemsWithCategories] = useRecoilState(
        itemsState
    )
    const [filteredLists, setFilteredLists] = useState([])

    useEffect(() => {
        async function getItems() {
            try {
                const res = await client.get('items')
                setItemsWithCategories(res.data.data)
            } catch (e) {
                console.log('Error', e)
            }
        }
        getItems()
    }, [])

    useEffect(() => {
        if (itemsWithCategories.length > 0) {
            const sorted: any = [...itemsWithCategories].sort((a, b) => {
                return b.items.length - a.items.length
            })
            setFilteredLists(sorted)
        }
    }, [itemsWithCategories])

    /**
     * Callback to update the list when a category is updated
     * @param cat
     */
    const categoryUpdated = (cat: any) => {
        const index = itemsWithCategories.findIndex(
            (list) => list.category_id === cat.id
        )

        setItemsWithCategories((oldLists) => {
            const newLists = [...oldLists]
            console.log('NewLists', newLists)
            newLists[index] = { ...newLists[index], category: cat.name }
            console.log('NewLists', newLists)

            return newLists
        })
    }

    /**
     * Search the items in the lists
     * @param query {string}
     */
    const searchItems = (query: string) => {
        let filtered: any = []
        itemsWithCategories.forEach((list) => {
            const items = list.items.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            )
            if (items.length > 0) {
                filtered.push({
                    ...list,
                    items,
                })
            }
        })

        setFilteredLists(() => filtered)
    }

    return (
        <div className="container mx-auto flex flex-col h-full">
            <div className="flex flex-col xl:flex-row mb-5 px-6 lg:px-20 py-4">
                <h1 className="hidden md:block text-2xl font-bold mr-2">
                    <span className="text-primary">Shoppingify</span> allows you
                    take your shopping list wherever you go
                </h1>
                <SearchInput search={searchItems} />
            </div>
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="overflow-y-auto px-6 lg:px-20"
            >
                {filteredLists.map((list: List) => (
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
