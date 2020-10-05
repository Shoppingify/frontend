import React, { useCallback, useEffect, useRef, useState } from 'react'

// Libs
import { useRecoilValue } from 'recoil'
import { motion } from 'framer-motion'

// Api client
import client from '../../api/client'

// Components
import Item from '../../components/cards/Item'
import CategoryHeadingEditable from '../../components/heading/CategoryHeadingEditable'
import SearchInput from '../../components/form-elements/SearchInput'

// Global state
import { itemsState } from '../../global-state/itemsState'

// Types
import { ItemType } from '../../types/items/types'
import AddItemButton from '../../components/button/AddItemButton'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'

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

    const itemsWithCategories = useRecoilValue(itemsState)
    const [filteredItems, setFilteredItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [toShow, setToShow] = useState<number[]>([0])

    const containerRef = useRef<HTMLUListElement | null>(null)
    // To avoid renders which might be skipped from the useEffect hook
    const setContainerRef = useCallback(
        (node: HTMLUListElement) => {
            if (node) {
                // If the container doesn't fill the height, I can add more items
                if (node.scrollHeight < window.screen.height) {
                    setToShow((old) => old.concat(old.length))
                }
            }

            containerRef.current = node
        },
        [itemsWithCategories]
    )

    /**
     * Infinite scroll hook
     */
    const [setIsFetching, isExhausted, setIsExhausted] = useInfiniteScroll(
        () => {
            if (toShow.length < itemsWithCategories.length) {
                setToShow((old) => old.concat(toShow.length))
                setIsFetching(false)
            } else {
                setIsExhausted(true)
            }
        },
        containerRef
    )

    useEffect(() => {
        if (itemsWithCategories.length > 0) {
            setFilteredItems(itemsWithCategories)
            setLoading(false)
        }
    }, [itemsWithCategories])

    // Check the containerHeight to add new items to display
    useEffect(() => {
        if (toShow.length < itemsWithCategories.length) {
            if (containerRef && containerRef.current) {
                if (containerRef.current.scrollTop < window.screen.height) {
                    setToShow((old) => old.concat(old.length))
                }
            }
        }
    }, [toShow, itemsWithCategories])

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
                    ref={setContainerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="overflow-y-auto px-3 md:px-5 lg:px-10"
                >
                    {filteredItems.map(
                        (listOfItems: ItemsWithCategories, index: number) => {
                            return (
                                toShow.includes(index) && (
                                    <li
                                        key={listOfItems.category_id}
                                        className="mb-10"
                                    >
                                        {/* Category name component */}
                                        <CategoryHeadingEditable
                                            category={listOfItems.category}
                                            category_id={
                                                listOfItems.category_id
                                            }
                                        />
                                        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-6 w-full">
                                            {listOfItems.items.length > 0 &&
                                                listOfItems.items.map(
                                                    (item: ItemType) => (
                                                        <li key={item.id}>
                                                            <Item
                                                                data={item}
                                                                category={
                                                                    listOfItems.category
                                                                }
                                                            />
                                                        </li>
                                                    )
                                                )}

                                            {listOfItems.items.length === 0 && (
                                                <AddItemButton
                                                    category_id={
                                                        listOfItems.category_id
                                                    }
                                                />
                                            )}
                                        </ul>
                                    </li>
                                )
                            )
                        }
                    )}
                </motion.ul>
            )}
        </div>
    )
}

export default React.memo(ItemsPage)
