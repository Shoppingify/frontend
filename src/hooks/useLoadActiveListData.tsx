import { toast } from 'react-toastify'
// Libs
import { useSetRecoilState } from 'recoil'

// Api Client
import client from '../api/client'

// Global state
import {
    shopListInfoState,
    shopListLoadingState,
    shopListState,
} from '../global-state/shopListState'

// Types
import { ItemType, ListOfItems } from '../types/items/types'
import { shopListInfoStateInterface } from '../types/state/shoppingListTypes'
import useCreateNewShoppingList from './useCreateNewShoppingList'

// Types
type activeListData = {
    created_at: string
    id: number
    name: string
    status: 'active' | 'complete' | 'canceled'
    updated_at: string
    user_id: number
}

const useLoadActiveListData = () => {
    const setShopListInfoState = useSetRecoilState(shopListInfoState)
    const setShopList = useSetRecoilState(shopListState)
    const setShopListLoadingState = useSetRecoilState(shopListLoadingState)

    // Hooks
    const createNewList = useCreateNewShoppingList()

    return async () => {
        setShopListLoadingState(true)
        try {
            const response = await client.get('lists?status=active')
            const {
                data: listData,
            }: { data: Array<activeListData> } = await response.data

            if (listData.length === 0) {
                // No Active list
                // Create a new list
                createNewList()
            } else {
                // Active list found
                const activeList = listData[0]
                const activeListId = activeList.id

                // Set global active list id
                setShopListInfoState((current: shopListInfoStateInterface) => ({
                    ...current,
                    activeListId,
                    status: activeList.status,
                    name: activeList.name,
                }))

                // Another request to fetch items
                const responseItems = await client.get(
                    `lists/${activeListId}/items`
                )

                const {
                    data: { items: itemsData },
                }: {
                    data: { items: ListOfItems[] }
                } = await responseItems.data
                setShopList(itemsData)
            }
        } catch (error) {
            toast.error('There was an error fetching active list')
            // TODO handle notifications
            console.log(error)
        } finally {
            setShopListLoadingState(false)
        }
    }
}

export default useLoadActiveListData
