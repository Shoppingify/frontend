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

// Components
import Button from '../button/Button'

// Api client
import client from '../../api/client'

// Types
import { ItemType } from '../../types/items/types'

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
    const setShopList = useSetRecoilState(shopListState)
    const setSidebarType = useSetRecoilState(sidebarState)
    const setCurrentItem = useSetRecoilState(currentItemState)
    const shopListInfo = useRecoilValue(shopListInfoState)

    /**
     * Loads the item in the sidebar
     */
    const showItem = useCallback(() => {
        setCurrentItem(data)
        setSidebarType(SHOW_ITEM)
    }, [])

    /**
     * Adds the item to the shopping list
     */
    const addItemToShopList = () => {
        setShopList((current: any) => {
            const currentItem: ItemType = {
                ...data,
                quantity: 1,
                categoryName: category,
            }

            const { id } = currentItem
            const newItems = JSON.parse(JSON.stringify(current))

            // In current state check if object with category clicked already exists
            const catIndex = current.findIndex(
                (x: any) => x.category === category
            )

            // Category already present in the state
            if (catIndex > -1) {
                // Try to find item in category.items
                const itemIndex = current[catIndex].items.findIndex(
                    (item: ItemType) => {
                        return item.id === id
                    }
                )

                // Item already present in category.items
                if (itemIndex > -1) {
                    newItems[catIndex].items[itemIndex].quantity += 1
                } else {
                    newItems[catIndex].items.push(currentItem)
                    // send post to api to add new item
                    // Using async causes the setShopList to break
                    client
                        .post(`lists/${shopListInfo.activeListId}/items`, {
                            item_id: id,
                            list_id: shopListInfo.activeListId,
                        })
                        .then((response) => {
                            toast.success('Item added to the list')
                        })
                        .catch((error) => {
                            toast.error(
                                'Something went wrong! List only updated locally'
                            )
                        })
                }
            } else {
                // send post to api to add new item
                // Using async causes the setShopList to break
                client
                    .post(`lists/${shopListInfo.activeListId}/items`, {
                        item_id: id,
                        list_id: shopListInfo.activeListId,
                    })
                    .then((response) => {
                        toast.success('Item added to the list')
                    })
                    .catch((error) => {
                        toast.error(
                            'Something went wrong! List only updated locally'
                        )
                    })

                // Push to new items array
                newItems.push({
                    category: category,
                    items: [currentItem],
                })
            }

            return newItems
        })
    }

    return (
        <div className="relative m-2 bg-white overflow-hidden shadow-item rounded-lg flex justify-between items-center">
            <button className="p-3 m-1 w-full pr-24" onClick={showItem}>
                <h4 className="font-medium text-left">
                    {data.name}{' '}
                    {history ? (
                        <span className="text-primary text-sm font-bold mx-1">
                            {data.quantity && data.quantity > 1 ? 'pcs' : 'pc'}
                        </span>
                    ) : null}
                </h4>
            </button>
            <Button
                className="m-2 hover:text-primary transition-colors duration-300 text-black absolute right-0"
                onClick={addItemToShopList}
                style={{
                    height: 'fit-content',
                    width: 'fit-content',
                }}
            >
                <MdAdd size={24} />
            </Button>
        </div>
    )
}

export default React.memo(Item)
