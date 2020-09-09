import { atom } from 'recoil'

// Sidebar state constants
export const ADD_SHOPPING_LIST = 'add_shopping_list'
export const SHOW_SHOPPING_LIST = 'show_shopping_list'
export const ADD_NEW_ITEM = 'add_new_item'
export const SHOW_ITEM = 'show_item'

export const appConfigState = atom({
    key: 'appConfigState',
    default: {
        activeListId: -1,
    },
})

// Sidebar state to switch between sidebars
export const sidebarState = atom({
    key: 'sidebar',
    default: SHOW_SHOPPING_LIST,
})

// All user's items
export const userItemsState = atom({
    key: 'items',
    default: [],
})

// All user's categories
export const userCategoriesState = atom({
    key: 'categories',
    default: [],
})
