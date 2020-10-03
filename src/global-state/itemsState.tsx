import { atom } from 'recoil'
import { ListOfItems } from '../types/items/types'

export const itemsState = atom<ListOfItems[]>({
    key: 'items',
    default: [],
})

export const itemModifiedState = atom<boolean>({
    key: 'itemModified',
    default: false,
})
