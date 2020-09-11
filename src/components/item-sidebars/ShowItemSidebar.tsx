import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import client from '../../api/client'
import { itemsState } from '../../global-state/itemsState'
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

const ShowItemSidebar = () => {
    const [currentItem, setCurrentItem] = useRecoilState<ItemType | null>(
        currentItemState
    )
    const setLists = useSetRecoilState(itemsState)
    const setSidebarType = useSetRecoilState(sidebarState)
    const [sidebarHistory, setSidebarHistory] = useRecoilState(
        sidebarHistoryState
    )

    const addItem = async () => {
        try {
            // TODO add an item to the active list
            // await client.post("/")
        } catch (e) {
            console.log('Error while adding an item', e)
        }
    }

    const deleteItem = async () => {
        try {
            await client.delete(`items/${currentItem?.id}`)
            const itemResponse = await client.get('items')

            setLists(itemResponse.data.data)
            setCurrentItem(null)
            setSidebarType(SHOW_SHOPPING_LIST)
        } catch (e) {
            console.log('Error', e)
        }
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
        console.log('sidebarHistory back', sidebarHistory)
        const goTo = sidebarHistory[sidebarHistory.length - 2]
        // Reset l'history?
        setSidebarHistory([])
        setSidebarType(goTo)
    }

    /**
     * Completely useless error images
     * Useless therefore essential ;)
     */
    const randomImageError = () => {
        const images = [
            'https://media1.tenor.com/images/5020db30df28f5e56129752ab68732e3/tenor.gif?itemid=3407679',
            'https://media1.tenor.com/images/b3fef669ae866655eee51d59728e9065/tenor.gif?itemid=13908286',
            'https://media1.tenor.com/images/963dbf83410067b8216bf3fbeec50874/tenor.gif?itemid=5012719',
            'https://media.tenor.com/images/9117a39f59b1e089e3581687687cea1c/tenor.gif',
            'https://media.tenor.com/images/8d483e909ec3618f521e9700d6fbf2e1/tenor.gif',
        ]

        return images[Math.floor(Math.random() * images.length)]
    }

    return (
        <div className="flex flex-col h-full justify-between">
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
                        effect="blur"
                        style={{ maxHeight: '200px' }}
                        className="rounded-24 w-full mb-12 object-cover"
                        src={currentItem.image}
                        alt={currentItem.name}
                        placeholder={loader()}
                    />
                )}

                <div className="mb-4">
                    <div className="text-sm text-gray-light">Name</div>
                    <div className="text-xl mt-2">{currentItem?.name}</div>
                </div>
                <div className="mb-4">
                    <div className="text-sm text-gray-light">Category</div>
                    <div className="text-xl mt-2">
                        {currentItem?.categoryName}
                    </div>
                </div>
                {currentItem?.note && (
                    <div className="mb-4">
                        <div className="text-sm text-gray-light">Name</div>
                        <div className="text-xl mt-2">{currentItem?.note}</div>
                    </div>
                )}
            </div>
            {/* Buttons */}
            <div className="flex justify-center items-center">
                <Button
                    onClick={deleteItem}
                    modifier="danger"
                    className="text-white mr-2"
                >
                    Delete
                </Button>
                <Button onClick={addItem} type="submit" modifier="primary">
                    Add to list
                </Button>
            </div>
        </div>
    )
}

export default ShowItemSidebar