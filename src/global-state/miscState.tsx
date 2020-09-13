import { atom } from 'recoil'

// Types
import { userStateInterface } from '../types/state/userStateTypes'
import { appConfigInterface } from '../types/state/appConfigTypes'

// Sidebar state constants
export const ADD_SHOPPING_LIST = 'add_shopping_list'
export const SHOW_SHOPPING_LIST = 'show_shopping_list'
export const ADD_NEW_ITEM = 'add_new_item'
export const SHOW_ITEM = 'show_item'

type appConfigStateType = {
    key: string
    default: appConfigInterface
}

const appConfigStateData: appConfigStateType = {
    key: 'appConfigState',
    default: {
        activeListId: -1,
    },
}

// App config state - active list id
export const appConfigState = atom(appConfigStateData)

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
