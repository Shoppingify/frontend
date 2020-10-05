import { atom } from 'recoil'

export const shopListHistoryState = atom({
    key: 'shopListHistoryState',
    default: [],
})

export const shopListHistoryLoadingState = atom({
    key: 'shopListHistoryLoadingState',
    default: true,
})
