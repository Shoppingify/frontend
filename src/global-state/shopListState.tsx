import { atom } from 'recoil'
import { ItemType } from '../types/items/types'

const shopListStateConst: { key: string; default: ItemType[] } = {
    key: 'shopList',
    default: [],
}

// Shopping list state
export const shopListDataState = atom(shopListStateConst)
