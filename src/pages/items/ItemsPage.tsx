import React, { useEffect, useState } from 'react'

// Libs
import { useRecoilState, useSetRecoilState } from 'recoil'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'

// Api client
import client from '../../api/client'

// Components
import Button from '../../components/button/Button'
import Item from '../../components/cards/Item'
import CategoryTitle from '../../components/categories/CategoryTitle'
import SearchInput from '../../components/form-elements/SearchInput'

// Global state
import { currentItemState } from '../../global-state/currentItemState'
import { itemsState } from '../../global-state/itemsState'
import { shopListState } from '../../global-state/shopListState'
import { ADD_NEW_ITEM, sidebarState } from '../../global-state/sidebarState'

// Types
import { ItemType } from '../../types/items/types'
import { categoriesState } from '../../global-state/categoriesState'

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.01,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
}

interface ItemsWithCategories {
    category_id: number
    category: string
    items: Array<any>
}

// TODO refactor, example of a bad component. Refactor the logic into its own components
/**
 * Simple items page component
 */
const ItemsPage: React.FC = () => {
    // Local state
    const [itemsWithCategories, setItemsWithCategories] = useRecoilState(
        itemsState
    )
    const [filteredItems, setFilteredItems] = useState([])
    const setCurrentItem = useSetRecoilState(currentItemState)
    const setSidebarType = useSetRecoilState(sidebarState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getItems() {
            try {
                const res = await client.get('items')
                setItemsWithCategories(res.data.data)
            } catch (e) {
                console.log('Error', e)
            } finally {
                setLoading(false)
            }
        }
        getItems()
    }, [])

    useEffect(() => {
        if (itemsWithCategories.length > 0) {
            const sorted: any = [...itemsWithCategories].sort((a, b) => {
                return b.items.length - a.items.length
            })
            setFilteredItems(sorted)
        }
    }, [itemsWithCategories])

    /**
     * Search the items in the lists
     * @param query {string}
     */
    const searchItems = (query: string) => {
        let filtered: any = []
        itemsWithCategories.forEach((list) => {
            const items = list.items.filter((item) =>
                item?.name?.toLowerCase().includes(query.toLowerCase())
            )
            if (items.length > 0) {
                filtered.push({
                    ...list,
                    items,
                })
            }
        })

        setFilteredItems(() => filtered)
    }

    const addAnItem = (category: string) => {
        setCurrentItem({
            name: '',
            note: '',
            image: '',
            categoryName: category,
        })
        setSidebarType(ADD_NEW_ITEM)
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

            {filteredItems.length === 0 && (
                <div className="flex justify-center">
                    <h3 className="text-xl font-bold">
                        {loading ? 'Loading...' : 'No item found...'}
                    </h3>
                </div>
            )}

            {filteredItems.length > 0 && (
                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="overflow-y-auto px-3 md:px-5 lg:px-10"
                >
                    {filteredItems.map((listOfItems: ItemsWithCategories) => (
                        <li key={uuidv4()} className="mb-10">
                            {/* Category name component */}
                            <CategoryTitle
                                category={listOfItems.category}
                                category_id={listOfItems.category_id}
                            />
                            <ul className="grid grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-6 w-full">
                                {listOfItems.items.length > 0 &&
                                    listOfItems.items.map((item: ItemType) => (
                                        <motion.li
                                            variants={itemVariants}
                                            key={item.id}
                                        >
                                            <Item
                                                data={item}
                                                category={listOfItems.category}
                                            />
                                        </motion.li>
                                    ))}

                                {listOfItems.items.length === 0 && (
                                    <Button
                                        modifier=""
                                        onClick={() =>
                                            addAnItem(listOfItems.category)
                                        }
                                        className="text-gray"
                                    >
                                        Add an item
                                    </Button>
                                )}
                            </ul>
                        </li>
                    ))}
                </motion.ul>
            )}
        </div>
    )
}

export default React.memo(ItemsPage)
