import { atom } from 'recoil'

export const statisticsState = atom({
    key: 'statistics',
    default: {
        month: {
            itemsByMonth: [],
            categoriesByMonth: [],
            quantityByDay: [],
        },
        year: {
            itemsByYear: [],
            categoriesByYear: [],
            quantityByMonth: [],
        },
    },
})
