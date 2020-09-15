import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// Libs
import { useRecoilState, useSetRecoilState } from 'recoil/dist'
import { v4 as uuidv4 } from 'uuid'
import client from '../../api/client'
import Button from '../../components/button/Button'
import Item from '../../components/cards/Item'
import CategoryTitle from '../../components/categories/CategoryTitle'
import SearchInput from '../../components/form-elements/SearchInput'
import AddItemSidebar from '../../components/item-sidebars/AddItemSidebar'
import { currentItemState } from '../../global-state/currentItemState'
import { itemsState } from '../../global-state/itemsState'
import { shopListState } from '../../global-state/shopListState'
import { ADD_NEW_ITEM, sidebarState } from '../../global-state/sidebarState'
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

interface ItemsWithCategories {
    category_id: number
    category: string
    items: Array<any>
}

// TODO refactor, example of a bad component. Refactor the logic into its own components
/**
 * Simple items page component
 */
const HistoryShowPage = () => {
    const { listId }: any = useParams()
    // Local state
    const [itemsWithCategories, setItemsWithCategories] = useState([])
    // const setSidebarType = useSetRecoilState(sidebarState)

    useEffect(() => {
        async function getItems() {
            if (!listId) return
            try {
                const res = await client.get(`lists/${listId}/items`)
                console.log('res', res.data.data)
                // setItemsWithCategories(res.data.data)
            } catch (e) {
                console.log('Error', e)
            }
        }
        getItems()
    }, [])

    // useEffect(() => {
    //     if (itemsWithCategories.length > 0) {
    //         const sorted: any = [...itemsWithCategories].sort((a, b) => {
    //             return b.items.length - a.items.length
    //         })
    //         setFilteredItems(sorted)
    //     }
    // }, [itemsWithCategories])

    /**
     * Callback to update the list when a category is updated
     * @param cat
     */
    // const categoryUpdated = (cat: any) => {
    //     const index = itemsWithCategories.findIndex(
    //         (list) => list.category_id === cat.id
    //     )

    //     // Update the categoryName on the list and for each items
    //     setItemsWithCategories((oldLists) => {
    //         const newLists = [...oldLists]
    //         let newItems: ItemType[] = []
    //         newLists[index].items.forEach((item: ItemType) => {
    //             newItems.push({ ...item, categoryName: cat.name })
    //         })
    //         newLists[index] = {
    //             ...newLists[index],
    //             items: newItems,
    //             category: cat.name,
    //         }
    //         console.log('newLists', newLists)
    //         return newLists
    //     })

    //     // Update the categoryName in the shopList
    //     setShopList((oldList: any) => {
    //         const newList = [...oldList]
    //         const index = newList.findIndex((el) => {
    //             console.log('el', el)
    //             return el.category_id === cat.id
    //         })
    //         if (index > -1) {
    //             newList[index] = { ...newList[index], category: cat.name }
    //         }

    //         return newList
    //     })

    //     // Update the categoryName on the currentItem
    //     if (currentItem) {
    //         setCurrentItem((old) => {
    //             return { ...old, categoryName: cat.name }
    //         })
    //     }
    // }

    return (
        <div className="container mx-auto flex flex-col h-full">
            <div className="flex flex-col xl:flex-row mb-5 px-6 lg:px-20 py-4">
                <h1 className="hidden md:block text-2xl font-bold mr-2">{}</h1>
            </div>
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="overflow-y-auto px-6 lg:px-20"
            >
                {itemsWithCategories.length > 0 &&
                    itemsWithCategories.map(
                        (listOfItems: ItemsWithCategories) => (
                            <li key={uuidv4()} className="mb-5">
                                {/* Category name component */}
                                <CategoryTitle
                                    category={listOfItems.category}
                                    category_id={listOfItems.category_id}
                                    categoryUpdated={() => {}}
                                />
                                <ul
                                    style={{ marginLeft: '-12px' }}
                                    className="flex flex-wrap w-full"
                                >
                                    {listOfItems.items.length > 0 &&
                                        listOfItems.items.map(
                                            (item: ItemType) => (
                                                <motion.li
                                                    variants={itemVariants}
                                                    key={uuidv4()}
                                                >
                                                    <Item
                                                        data={item}
                                                        category={
                                                            listOfItems.category
                                                        }
                                                    />
                                                </motion.li>
                                            )
                                        )}

                                    {listOfItems.items.length === 0 && (
                                        <Button
                                            modifier=""
                                            className="text-gray"
                                        >
                                            Add an item
                                        </Button>
                                    )}
                                </ul>
                            </li>
                        )
                    )}
            </motion.ul>
        </div>
    )
}

export default HistoryShowPage
