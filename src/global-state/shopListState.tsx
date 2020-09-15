import { atom } from 'recoil'
import { ItemType } from '../types/items/types'
import { shopListInfoStateInterface } from '../types/state/shoppingListTypes'

type shopListInfoStateType = {
    key: string
    default: shopListInfoStateInterface
}

const shopListStateConst: { key: string; default: ItemType[] } = {
    key: 'shopList',
    default: [],
}

const shopListInfoStateConst: shopListInfoStateType = {
    key: 'appConfigState',
    default: {
        activeListId: -1,
        status: 'active',
    },
}

// Shopping list state
export const shopListState = atom(shopListStateConst)

// App config state - active list id
export const shopListInfoState = atom(shopListInfoStateConst)
