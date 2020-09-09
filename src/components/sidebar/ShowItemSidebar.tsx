import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
    currentItemState,
    userCategoriesState,
    sidebarState,
    ADD_NEW_ITEM,
} from '../../global-state/atoms'
import { ItemType, CategoryType } from '../../types/items/types'

const ShowItemSidebar = () => {
    const currentItem = useRecoilValue<ItemType | null>(currentItemState)
    const categories = useRecoilValue<CategoryType[] | any[]>(
        userCategoriesState
    )
    const [sidebarType, setSidebarType] = useRecoilState(sidebarState)

    const getCategory = (catId: number | undefined) => {
        if (catId) {
            const cat: CategoryType = categories.find((cat) => {
                console.log('CAtegory', cat)
                cat.id === catId
            })
            return cat.name
        }
        return null
    }
    return (
        <div>
            <a
                className="text-primary cursor-pointer hover:text-gray
                 transition-color duration-300"
                onClick={() => setSidebarType(ADD_NEW_ITEM)}
            >
                &larr; Back
            </a>
            {currentItem?.image && (
                <img
                    style={{ maxHeight: '200px' }}
                    className="rounded-24 w-full mb-12 mt-10 object-cover"
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
                    {getCategory(currentItem?.category_id)}
                </div>
            </div>
            {currentItem?.note && (
                <div className="mb-4">
                    <div className="text-sm text-gray-light">Name</div>
                    <div className="text-xl mt-2">{currentItem?.note}</div>
                </div>
            )}
        </div>
    )
}

export default ShowItemSidebar
