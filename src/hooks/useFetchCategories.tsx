import React, { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import client from '../api/client'
import { categoriesState } from '../global-state/categoriesState'

const useFetchCategories = () => {
    const [categories, setCategories] = useRecoilState(categoriesState)

    const fetchCategories = useCallback(async () => {
        try {
            if (categories.length === 0) {
                const res = await client.get('categories')
                setCategories(res.data.data)
            }
        } catch (e) {
            console.log('Impossible to fetch categories', e)
        }
    }, [])

    return fetchCategories
}

export default useFetchCategories
