// Libs
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'
import {
    adjectives,
    colors,
    Config,
    names,
    uniqueNamesGenerator,
} from 'unique-names-generator'

// Api Client
import client from '../api/client'

// Global state
import { shopListInfoState, shopListState } from '../global-state/shopListState'

// Types
import { ItemType } from '../types/items/types'
import { shopListInfoStateInterface } from '../types/state/shoppingListTypes'
import useLoadHistoryLists from './useFetchHistoryLists'

// Name generator
const nameConfig: Config = {
    dictionaries: [adjectives, colors, names],
    length: 3,
    separator: ' ',
    style: 'capital',
}

const useCreateNewShoppingList = () => {
    const setShopList = useSetRecoilState(shopListState)
    const setShopListInfoState = useSetRecoilState(shopListInfoState)
    const fetchShopListHistory = useLoadHistoryLists()

    return async () => {
        try {
            // POST new list with a random name
            const responseNewList = await client.post('/lists', {
                name: uniqueNamesGenerator(nameConfig),
            })

            // Store created list info in variable
            const createdList = await responseNewList.data.data.list

            // Fetch items of this list
            const responseItems = await client.get(
                `lists/${createdList.id}/items`
            )
            // Store items
            const {
                data: { items: itemsData },
            }: {
                data: { items: ItemType[] }
            } = await responseItems.data

            /**
             * Setting local state
             */
            // Set global active list id
            setShopListInfoState((current: shopListInfoStateInterface) => ({
                ...current,
                activeListId: createdList.id,
                status: createdList.status,
                name: createdList.name,
            }))
            // Refresh history list

            // Set items to local shop list state
            setShopList(itemsData)
            // Refetch history lists
            fetchShopListHistory()
            toast.success(`Created new active list: ${createdList.name}`)
        } catch (error) {
            // TODO handle notifications
            toast.error('An error occured')
            console.log(error)
        }
    }
}

export default useCreateNewShoppingList
