import { atom } from 'recoil'
import { userStateInterface } from '../types/state/userStateTypes'

// Sidebar state constants
export const ADD_SHOPPING_LIST = 'add_shopping_list'
export const SHOW_SHOPPING_LIST = 'show_shopping_list'
export const ADD_NEW_ITEM = 'add_new_item'
export const SHOW_ITEM = 'show_item'

// App config state - active list id
export const appConfigState = atom({
    key: 'appConfigState',
    default: {
        activeListId: -1,
    },
})

// State for user check if valid
type userStateType = {
    key: string
    default: userStateInterface
}

const userStateConst: userStateType = {
    key: 'userState',
    default: {
        token: '',
        valid: false,
        loadingLogin: false,
    },
}

export const userState = atom(userStateConst)
