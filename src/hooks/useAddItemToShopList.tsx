// Libs
import { toast } from 'react-toastify'

// Api client
import client from '../api/client'

// Global state
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { shopListInfoState, shopListState } from '../global-state/shopListState'

// Types
import { ItemType } from '../types/items/types'

const useAddItemToShopList = () => {
    const setShopList = useSetRecoilState(shopListState)
    const shopListInfo = useRecoilValue(shopListInfoState)

    /**
     * Makes a POST request to store item in the database under the active list
     */
    const storeItemInDb = (id: number) => {
        client
            .post(`lists/${shopListInfo.activeListId}/items`, {
                item_id: id,
                list_id: shopListInfo.activeListId,
            })
            .then((response) => {
                console.log(response)
                toast.success('Item added to the list')
            })
            .catch((error) => {
                console.log(error)
                toast.error('Something went wrong! List only updated locally')
            })
    }

    /**
     * Makes a PUT request to update item in the active list
     */
    const updateSingleItem = (item: ItemType) => {
        // If quantity is higher than 0 update the shop list, no need for app state update since the app state shop list update triggers this effect
        client.put(`/lists/${shopListInfo.activeListId}/items`, {
            item_id: item.id,
            list_id: shopListInfo.activeListId,
            quantity: item.quantity ? item.quantity + 1 : 1,
            done: item.done,
        })
    }

    return (itemData: ItemType) => {
        setShopList((current: any) => {
            console.log(current)
            const currentItem: ItemType = {
                ...itemData,
                quantity: 1,
            }
            // Id cant be undefined
            const { id = -1, categoryName } = currentItem

            // Create a copy of current state of shop list
            const newItems = JSON.parse(JSON.stringify(current))

            // In current state check if object with category clicked already exists
            const catIndex = current.findIndex(
                (x: any) => x.category === categoryName
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
                    updateSingleItem(newItems[catIndex].items[itemIndex])
                    newItems[catIndex].items[itemIndex].quantity += 1
                } else {
                    newItems[catIndex].items.push(currentItem)
                    storeItemInDb(id)
                }
            } else {
                // send post to api to add new item
                storeItemInDb(id)

                // Push to new items array
                newItems.push({
                    category: categoryName,
                    category_id: currentItem.category_id,
                    items: [currentItem],
                })
            }

            return newItems
        })
    }
}

export default useAddItemToShopList
