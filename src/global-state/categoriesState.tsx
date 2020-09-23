import { atom, selectorFamily } from 'recoil'

export const categoriesState = atom<any[]>({
    key: 'categories',
    default: [],
})

export const categoriesLoadedState = atom({
    key: 'categoriesLoaded',
    default: {
        loading: true,
        loaded: false,
    },
})

export const singleCategoryState = selectorFamily({
    key: 'category',
    get: (id) => ({ get }: any) => {
        return get(categoriesState).find((cat: any) => cat.id === id)
    },
})
