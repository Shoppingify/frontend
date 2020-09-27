import { atom } from 'recoil'

export const statsState = atom({
    key: 'statsState',
    default: {
        loading: false,
        stats: {},
    },
})
