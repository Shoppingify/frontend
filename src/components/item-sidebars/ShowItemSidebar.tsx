import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import client from '../../api/client'
import { itemModifiedState } from '../../global-state/itemsState'
import { currentItemState } from '../../global-state/currentItemState'
import {
    ADD_NEW_ITEM,
    SHOW_SHOPPING_LIST,
    sidebarState,
    sidebarHistoryState,
} from '../../global-state/sidebarState'
import { ItemType } from '../../types/items/types'
import Button from '../button/Button'
import { MdModeEdit } from 'react-icons/md'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { motion } from 'framer-motion'
import { fadeInRightBig } from '../../animation/variants/move-in/fade-in'
import CategoryHeading from '../heading/CategoryHeading'
import useFetchItems from '../../hooks/useFetchItems'
import useAddItemToShopList from '../../hooks/useAddItemToShopList'
import useLoadActiveListData from '../../hooks/useLoadActiveListData'
import { useLocation } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import useSidebarShow from '../../hooks/useSidebarShow'

const ShowItemSidebar = () => {
    const [currentItem, setCurrentItem] = useRecoilState<ItemType | null>(
        currentItemState
    )
    const setSidebarType = useSetRecoilState(sidebarState)
    const setSidebarHistory = useSetRecoilState(sidebarHistoryState)
    const setItemModified = useSetRecoilState(itemModifiedState)

    // Hooks
    const fetchItems = useFetchItems()
    const addItemToShopList = useAddItemToShopList()
    const fetchActiveList = useLoadActiveListData()
    const showSidebar = useSidebarShow()

    const location = useLocation()

    const addItem = async () => {
        try {
            if (currentItem) {
                await addItemToShopList(currentItem)
                setSidebarType(SHOW_SHOPPING_LIST)
            }
        } catch (e) {
            console.log('Error while adding an item', e)
        }
    }

    const deleteItem = async () => {
        try {
            await client.delete(`items/${currentItem?.id}`)

            await fetchItems()
            await fetchActiveList()

            if (location.pathname.startsWith('/history/')) {
                setItemModified(true)
            }

            setCurrentItem(null)
            setSidebarType(SHOW_SHOPPING_LIST)
        } catch (e) {
            console.log('Error', e)
        }
    }

    const addNewItem = () => {
        setCurrentItem(null)
        setSidebarType(ADD_NEW_ITEM)
    }

    const loader = () => {
        return (
            <div
                style={{ minHeight: '150px' }}
                className="w-full bg-gray-light rounded-24 mb-12"
            ></div>
        )
    }

    const back = () => {
        // Reset l'history?
        setSidebarHistory([])
        // showSidebar('Right')
        setSidebarType(SHOW_SHOPPING_LIST)
    }

    /**
     * Completely useless error images
     * Useless therefore essential ;)
     */
    const randomImageError = (
        e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
        const images = [
            'https://media1.tenor.com/images/5020db30df28f5e56129752ab68732e3/tenor.gif?itemid=3407679',
            'https://media1.tenor.com/images/b3fef669ae866655eee51d59728e9065/tenor.gif?itemid=13908286',
            'https://media1.tenor.com/images/963dbf83410067b8216bf3fbeec50874/tenor.gif?itemid=5012719',
            'https://media.tenor.com/images/9117a39f59b1e089e3581687687cea1c/tenor.gif',
            'https://media.tenor.com/images/8d483e909ec3618f521e9700d6fbf2e1/tenor.gif',
        ]

        return ((e.target as HTMLImageElement).src =
            images[Math.floor(Math.random() * images.length)])
    }

    return (
        <motion.div
            key="showitemkey"
            variants={fadeInRightBig}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ type: 'Tween' }}
            className="flex flex-col h-full justify-between p-3 lg:p-8 overflow-hidden"
        >
            <div>
                <div className="flex w-full justify-between items-center mb-6">
                    <a
                        className="block text-primary cursor-pointer hover:text-gray
                 transition-color duration-300"
                        onClick={back}
                    >
                        &larr; Back
                    </a>
                    <MdModeEdit
                        className="text-xl cursor-pointer hover:text-primary transition-color duration-300"
                        onClick={() => setSidebarType(ADD_NEW_ITEM)}
                    />
                </div>

                {currentItem?.image && (
                    <LazyLoadImage
                        onError={randomImageError}
                        effect="blur"
                        style={{ maxHeight: '200px' }}
                        wrapperClassName="w-full"
                        className="rounded-24 w-full mb-4 md:mb-12 object-cover"
                        src={currentItem.image}
                        alt={currentItem.name}
                        placeholder={loader()}
                    />
                )}

                <div className="mb-4">
                    <div className="text-sm text-gray-light">Name</div>
                    <div className="text-xl mt-2 break-all">
                        {currentItem?.name}
                    </div>
                </div>
                {currentItem?.category_id && (
                    <div className="mb-4">
                        <div className="text-sm text-gray-light">Category</div>
                        <CategoryHeading
                            level={3}
                            className="text-xl mt-2"
                            category_id={currentItem?.category_id}
                        />
                    </div>
                )}
                {currentItem?.note && (
                    <div className="mb-4">
                        <div className="text-sm text-gray-light">Note</div>
                        <div className="text-xl mt-2">{currentItem?.note}</div>
                    </div>
                )}
            </div>
            {/* Buttons */}
            <div className="flex justify-center items-center flex-wrap md:flex-no-wrap">
                <Button onClick={deleteItem} modifier="danger" className="mr-2">
                    Delete
                </Button>
                <Button
                    onClick={addItem}
                    type="submit"
                    modifier="primary"
                    className="mr-2"
                >
                    Add to list
                </Button>
                <Button onClick={addNewItem} modifier="" className="text-black">
                    New item
                </Button>
            </div>
        </motion.div>
    )
}

export default ShowItemSidebar
