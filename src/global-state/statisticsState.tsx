import { atom } from 'recoil'

export const statisticsState = atom({
    key: 'statistics',
    default: {
        loading: false,
        noStats: false,
        stats: {
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
    },
})
