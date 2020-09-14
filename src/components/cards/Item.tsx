import React, { useCallback } from 'react'

import { MdAdd } from 'react-icons/md'

// Recoil
import { shopListDataState } from '../../global-state/shopListState'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { ItemType } from '../../types/items/types'
import { currentItemState } from '../../global-state/currentItemState'
import { sidebarState, SHOW_ITEM } from '../../global-state/sidebarState'
import client from '../../api/client'
import { appConfigState } from '../../global-state/miscState'
import { toast } from 'react-toastify'

// TODO how to handle long item names? Fix word breaking
// TODO how to align plus symbol to the item name, multilines item name issue
// TODO check if this card is reused somewhere else, if it is reconsider onClick function
/**
 *
 * Component that displays a simple card for single item
 * When clicking the button it adds a new item to the sidebar state
 *
 * @param {string} name
 *  Name of the item
 * @param {string} note
 *  Note of the item
 * @param {string} id
 *  Id of the item
 * @param {string} image
 *  Image src of the item
 */
const Item = ({ data, category }: any) => {
    const setShopList = useSetRecoilState(shopListDataState)
    const setSidebarType = useSetRecoilState(sidebarState)
    const setCurrentItem = useSetRecoilState(currentItemState)

    const showItem = useCallback(() => {
        setCurrentItem(data)
        setSidebarType(SHOW_ITEM)
    }, [])

    const appConfig = useRecoilValue(appConfigState)

    function addItemToShopList() {
        //@ts-ignore
        // TODO refactor, setting app state
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
                        .post(`lists/${appConfig.activeListId}/items`, {
                            item_id: id,
                            list_id: appConfig.activeListId,
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
                    .post(`lists/${appConfig.activeListId}/items`, {
                        item_id: id,
                        list_id: appConfig.activeListId,
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
        <div className="relative m-2 bg-white overflow-hidden shadow-md rounded-lg flex justify-between items-center">
            <button className="p-3 m-1 w-full" onClick={showItem}>
                <h4 className="font-medium text-left">{data.name}</h4>
            </button>
            <button
                className="m-2 hover:text-primary transition-colors duration-300"
                onClick={addItemToShopList}
                style={{
                    height: 'fit-content',
                    width: 'fit-content',
                }}
            >
                <MdAdd size={24} />
            </button>
        </div>
    )
}

export default React.memo(Item)
