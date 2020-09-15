import { format } from 'date-fns'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MdDateRange } from 'react-icons/md'
import { useHistory, useParams } from 'react-router-dom'
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
import { ListType } from '../../types/interfaces/db_interfaces'
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
    const history = useHistory()
    // Local state
    const [itemsWithCategories, setItemsWithCategories] = useState([])
    const [list, setList] = useState<ListType | null>(null)
    // const setSidebarType = useSetRecoilState(sidebarState)

    useEffect(() => {
        async function getList() {
            if (!listId) return
            try {
                const res = await client.get(`lists/${listId}`)
                console.log('Get list res', res.data)
                setList(res.data.data)
            } catch (e) {
                console.log('Error while fetching the list', e)
            }
        }
        async function getItems() {
            if (!listId) return
            try {
                const res = await client.get(`lists/${listId}/items`)
                console.log('res', res.data.data)
                setItemsWithCategories(res.data.data.items)
            } catch (e) {
                console.log('Error', e)
            }
        }
        getList()
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

    if (!list) return <div>Loading...</div>

    return (
        <div className="container mx-auto flex flex-col h-full">
            <div className="flex flex-col mb-5 px-6 lg:px-20 py-4">
                <a
                    className="block text-primary cursor-pointer hover:text-gray
                 transition-color duration-300 mb-4"
                    onClick={() => history.push('/history')}
                >
                    &larr; Back
                </a>
                <h1 className="hidden md:block text-2xl font-bold mr-2">
                    {list?.name}
                </h1>
                <div className="flex items-center">
                    <MdDateRange className="text-gray-light mr-2 w-6 h-6" />
                    <div className=" text-gray-light text-sm font-medium">
                        {format(new Date(list.created_at), 'iii d.M.yyyy ')}
                    </div>
                </div>
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
                                <h3 className="text-lg font-bold mr-4">
                                    {listOfItems.category}
                                </h3>
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
                                                        history={true}
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
