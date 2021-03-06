import { format } from 'date-fns'
import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import { MdDateRange } from 'react-icons/md'
import { useHistory, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import client from '../../api/client'
import Button from '../../components/button/Button'
import Item from '../../components/cards/Item'
import BasicError from '../../components/errors/BasicError'
import Heading from '../../components/heading/Heading'
import BasicLoader from '../../components/loader/BasicLoader'
import { itemModifiedState } from '../../global-state/itemsState'
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
    const [itemModified, setItemModified] = useRecoilState(itemModifiedState)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getList = useCallback(async () => {
        setLoading(true)
        if (!listId) return
        try {
            const listRes = await client.get(`lists/${listId}`)
            const itemsRes = await client.get(`lists/${listId}/items`)
            setList(listRes.data.data)
            setItemsWithCategories(itemsRes.data.data.items)
        } catch (e) {
            console.log('Error while fetching the list', e)
            setError('An error occured, please refresh the page')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getList()
    }, [])

    useEffect(() => {
        if (itemModified) {
            getList()
            setItemModified(false)
        }
    }, [itemModified])

    if (loading) return <BasicLoader />

    if (!loading && error) return <BasicError message={error} />

    return (
        <div className="container mx-auto flex flex-col h-full">
            <div className="flex flex-col mb-5 px-6 lg:px-10 py-4">
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
                        {format(new Date(list!.created_at), 'iii d.M.yyyy ')}
                    </div>
                </div>
            </div>
            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="overflow-y-auto px-6 lg:px-10"
            >
                {itemsWithCategories.length > 0 &&
                    itemsWithCategories.map(
                        (listOfItems: ItemsWithCategories) => (
                            <li key={listOfItems.category_id} className="mb-5">
                                {/* Category name component */}
                                <Heading
                                    level={3}
                                    className={`font-bold mr-4 rounded-lg mb-2`}
                                >
                                    {listOfItems.category}
                                </Heading>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-6 w-full">
                                    {listOfItems.items.length > 0 &&
                                        listOfItems.items.map(
                                            (item: ItemType) => (
                                                <li key={item.id}>
                                                    <Item
                                                        data={item}
                                                        category={
                                                            listOfItems.category
                                                        }
                                                        history={true}
                                                    />
                                                </li>
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
