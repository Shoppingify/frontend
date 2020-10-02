import { atom } from 'recoil'

// Types
import { userStateInterface } from '../types/state/userStateTypes'

// Sidebar state constants
export const ADD_SHOPPING_LIST = 'add_shopping_list'
export const SHOW_SHOPPING_LIST = 'show_shopping_list'
export const ADD_NEW_ITEM = 'add_new_item'
export const SHOW_ITEM = 'show_item'

// State for user check if valid
type userStateType = {
    key: string
    default: userStateInterface | null
}

const userStateConst: userStateType = {
    key: 'userState',
    default: null,
}

export const userState = atom(userStateConst)
