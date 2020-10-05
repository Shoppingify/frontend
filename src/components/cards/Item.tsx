import React, { useCallback } from 'react'

// Libs
import { MdAdd } from 'react-icons/md'
import { toast } from 'react-toastify'

// Recoil
import {
    shopListState,
    shopListInfoState,
} from '../../global-state/shopListState'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { currentItemState } from '../../global-state/currentItemState'
import { sidebarState, SHOW_ITEM } from '../../global-state/sidebarState'

// Types
import { ItemType } from '../../types/items/types'
import useAddItemToShopList from '../../hooks/useAddItemToShopList'

// Prop types
type PropTypes = {
    data: ItemType
    category: string
    history?: boolean
}

/**
 * Component that displays a simple card for single item
 * When clicking the button it adds a new item to the sidebar state
 */
const Item: React.FC<PropTypes> = ({ data, category, history }) => {
    // Global state
    const setSidebarType = useSetRecoilState(sidebarState)
    const setCurrentItem = useSetRecoilState(currentItemState)

    // Hooks
    const addItemToShopList = useAddItemToShopList()

    /**
     * Loads the item in the sidebar
     */
    const showItem = useCallback(() => {
        setCurrentItem(data)
        setSidebarType(SHOW_ITEM)
    }, [])

    /**
     * Handles adding item to shopping list
     */
    const handleAddItem = () => {
        addItemToShopList(data)
    }

    return (
        <div
            className={`p-3 ${
                data.deleted_at === null
                    ? 'bg-white items-center'
                    : 'border border-danger flex-col items-start'
            } overflow-hidden shadow-item rounded-lg flex justify-between`}
        >
            <button
                className="break-all flex-auto"
                onClick={showItem}
                disabled={data.deleted_at !== null}
            >
                <h4 className="font-medium text-left break-all">
                    {data.name}{' '}
                    {history ? (
                        <span className="text-primary text-sm font-bold mx-1">
                            {data.quantity} {data.quantity! > 1 ? 'pcs' : 'pc'}
                        </span>
                    ) : null}
                </h4>
            </button>
            <button
                className={`${data.deleted_at ? '' : 'm-2'}`}
                onClick={handleAddItem}
                disabled={data.deleted_at !== null}
            >
                {!data.deleted_at && (
                    <MdAdd
                        className="text-gray-light hover:text-primary transition-colors duration-300"
                        size={24}
                    />
                )}
                {data.deleted_at && (
                    <span className="text-danger text-sm font-medium">
                        Item deleted
                    </span>
                )}
            </button>
        </div>
    )
}

export default React.memo(Item)
