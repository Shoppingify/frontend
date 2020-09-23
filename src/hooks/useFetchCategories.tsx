import React, { useCallback, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import client from '../api/client'
import {
    categoriesState,
    categoriesLoadedState,
} from '../global-state/categoriesState'

const useFetchCategories = () => {
    const setCategories = useSetRecoilState(categoriesState)
    const [categoriesLoaded, setCategoriesLoadedState] = useRecoilState(
        categoriesLoadedState
    )

    return useCallback(async () => {
        try {
            setCategoriesLoadedState({
                loading: true,
                loaded: false,
            })
            const res = await client.get('categories')
            setCategories(res.data.data)
            setCategoriesLoadedState({
                loading: false,
                loaded: true,
            })
        } catch (e) {
            console.log('Impossible to fetch categories', e)
        }
    }, [])
}
export default useFetchCategories
