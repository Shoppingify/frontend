import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import client from '../../api/client'
import { itemsState } from '../../global-state/itemsState'
import { currentItemState } from '../../global-state/currentItemState'
import {
    ADD_NEW_ITEM,
    SHOW_SHOPPING_LIST,
    sidebarState,
} from '../../global-state/sidebarState'
import { ItemType } from '../../types/items/types'
import Button from '../button/Button'

const ShowItemSidebar = () => {
    const [currentItem, setCurrentItem] = useRecoilState<ItemType | null>(
        currentItemState
    )
    const setLists = useSetRecoilState(itemsState)
    const setSidebarType = useSetRecoilState(sidebarState)

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

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <a
                    className="block text-primary cursor-pointer hover:text-gray
                 transition-color duration-300 mb-6"
                    onClick={() => setSidebarType(ADD_NEW_ITEM)}
                >
                    &larr; Back
                </a>

                {currentItem?.image && (
                    <img
                        style={{ maxHeight: '200px' }}
                        className="rounded-24 w-full mb-12 object-cover"
                        src={currentItem.image}
                        alt={currentItem.name}
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
                <Button onClick={deleteItem} modifier="" text="Delete" />
                <Button
                    onClick={addItem}
                    type="submit"
                    modifier="primary"
                    text="Add to list"
                />
            </div>
        </div>
    )
}

export default ShowItemSidebar
