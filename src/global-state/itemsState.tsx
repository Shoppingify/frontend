import { atom } from 'recoil'
import { ListOfItems } from '../types/items/types'

export const itemsState = atom<ListOfItems[]>({
    key: 'items',
    default: [],
})
