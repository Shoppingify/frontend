import { atom, selectorFamily } from 'recoil'

export const categoriesState = atom({
    key: 'categories',
    default: [],
})

export const singleCategoryState = selectorFamily({
    key: 'category',
    get: (id) => ({ get }: any) => {
        return get(categoriesState).find((cat: any) => cat.id === id)
    },
})
