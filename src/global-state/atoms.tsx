import { atom } from "recoil";

// TODO Refactor this when considering shopping list
export const sidebarState = atom({
  key: 'sidebarState',
  default: {
    items: []
  }
})