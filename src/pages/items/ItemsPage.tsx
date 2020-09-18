import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
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

interface ItemsWithCategories {
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
    const setShopList = useSetRecoilState(shopListState)
    const [filteredItems, setFilteredItems] = useState([])
    const [currentItem, setCurrentItem] = useRecoilState(currentItemState)
    const setSidebarType = useSetRecoilState(sidebarState)

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
            setFilteredItems(sorted)
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

        // Update the categoryName on the list and for each items
        setItemsWithCategories((oldLists) => {
            const newLists = [...oldLists]
            let newItems: ItemType[] = []
            newLists[index].items.forEach((item: ItemType) => {
                newItems.push({ ...item, categoryName: cat.name })
            })
            newLists[index] = {
                ...newLists[index],
                items: newItems,
                category: cat.name,
            }
            console.log('newLists', newLists)
            return newLists
        })

        // Update the categoryName in the shopList
        setShopList((oldList: any) => {
            const newList = [...oldList]
            const index = newList.findIndex((el) => {
                console.log('el', el)
                return el.category_id === cat.id
            })
            if (index > -1) {
                newList[index] = { ...newList[index], category: cat.name }
            }

            return newList
        })

        // Update the categoryName on the currentItem
        if (currentItem) {
            setCurrentItem((old) => {
                return { ...old, categoryName: cat.name }
            })
        }
    }

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
            <ul className="overflow-y-auto px-3 md:px-5 lg:px-10">
                {filteredItems.map((listOfItems: ItemsWithCategories) => (
                    <li key={uuidv4()} className="mb-10">
                        {/* Category name component */}
                        <CategoryTitle
                            category={listOfItems.category}
                            category_id={listOfItems.category_id}
                            categoryUpdated={categoryUpdated}
                        />
                        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-6 w-full">
                            {listOfItems.items.length > 0 &&
                                listOfItems.items.map(
                                    (item: ItemType, index: number) => (
                                        <Item
                                            data={item}
                                            category={listOfItems.category}
                                            key={index}
                                        />
                                    )
                                )}

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
            </ul>
        </div>
    )
}

export default React.memo(ItemsPage)
