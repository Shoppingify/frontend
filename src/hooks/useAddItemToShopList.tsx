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

    return (itemData: ItemType) => {
        setShopList((current: any) => {
            const currentItem: ItemType = {
                ...itemData,
            }

            const { id, categoryName } = currentItem

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
                    newItems[catIndex].items[itemIndex].quantity += 1
                    return newItems
                } else {
                    newItems[catIndex].items.push({
                        ...currentItem,
                        quantity: 1,
                    })
                    //@ts-ignore
                    storeItemInDb(id)
                }
            }
            // send post to api to add new item
            //@ts-ignore
            storeItemInDb(id)

            // Push to new items array
            newItems.push({
                category: categoryName,
                items: [{ ...currentItem, quantity: 1 }],
            })

            return newItems
        })
    }
}

export default useAddItemToShopList
