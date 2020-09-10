import { atom } from 'recoil'

// Sidebar state constants
export const ADD_SHOPPING_LIST = 'add_shopping_list'
export const SHOW_SHOPPING_LIST = 'show_shopping_list'
export const ADD_NEW_ITEM = 'add_new_item'
export const SHOW_ITEM = 'show_item'

export const sidebarState = atom({
    key: 'sidebar',
    default: SHOW_SHOPPING_LIST,
})

export const sidebarHistoryState = atom({
    key: 'sidebar_history',
    default: [SHOW_SHOPPING_LIST],
})
