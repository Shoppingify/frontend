import React from 'react'

import { MdAdd } from 'react-icons/md'

// Recoil
import { shopListDataState } from '../../global-state/shopListState'
import { useSetRecoilState } from 'recoil'
import { ItemType } from '../../types/items/types'
import { currentItemState } from '../../global-state/currentItemState'
import { sidebarState, SHOW_ITEM } from '../../global-state/sidebarState'

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
function Item({ data, category }: any) {
    const setShopList = useSetRecoilState(shopListDataState)
    const setSidebarType = useSetRecoilState(sidebarState)
    const setCurrentItem = useSetRecoilState(currentItemState)

    const showItem = () => {
        console.log('data', data)
        setCurrentItem(data)
        setSidebarType(SHOW_ITEM)
    }

    function handleClick() {
        console.log('Before set state')
        //@ts-ignore
        // TODO refactor, setting app state
        setShopList((current: any) => {
            const currentItem: ItemType = { ...data, quantity: 1, category }

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
                }
            } else {
                newItems.push({
                    category: category,
                    items: [currentItem],
                })
            }

            return newItems
        })
    }

    return (
        <div className="relative bg-white overflow-hidden rounded-lg flex justify-between">
            <button className="p-4 w-full" onClick={showItem}>
                <h4 className="font-medium text-left">{data.name}</h4>
            </button>
            <button
                className="pt-4 pr-4"
                onClick={handleClick}
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

export default Item
