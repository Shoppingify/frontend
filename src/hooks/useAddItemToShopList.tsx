import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import client from '../api/client'
import { shopListInfoState, shopListState } from '../global-state/shopListState'
import { ItemType } from '../types/items/types'

const useAddItemToShopList = () => {
    const setShopList = useSetRecoilState(shopListState)
    const shopListInfo = useRecoilValue(shopListInfoState)

    return (itemData: ItemType) => {
        setShopList((current: any) => {
            const currentItem: ItemType = {
                ...itemData,
            }

            const { id, categoryName } = currentItem
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
                    category: categoryName,
                    items: [{ ...currentItem, quantity: 1 }],
                })
            }

            return newItems
        })
    }
}

export default useAddItemToShopList
