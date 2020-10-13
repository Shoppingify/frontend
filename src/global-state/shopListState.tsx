import { atom } from 'recoil'
import { ItemType, ListOfItems } from '../types/items/types'
import { shopListInfoStateInterface } from '../types/state/shoppingListTypes'

type shopListInfoStateType = {
    key: string
    default: shopListInfoStateInterface
}

export const activeListLoadingState = atom({
    key: 'activeListLoadingState',
    default: true,
})

const shopListStateConst: { key: string; default: ListOfItems[] } = {
    key: 'shopList',
    default: [],
}

const shopListInfoStateConst: shopListInfoStateType = {
    key: 'appConfigState',
    default: {
        activeListId: -1,
        status: 'active',
        name: 'No shopping list found',
    },
}

// Shopping list state
export const shopListState = atom(shopListStateConst)

// App config state - active list id
export const shopListInfoState = atom(shopListInfoStateConst)
