import { atom } from 'recoil'
import { ItemType } from '../types/items/types'

export const currentItemState = atom<ItemType | null>({
    key: 'currentItem',
    default: null,
})
