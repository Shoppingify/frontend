import React, { useCallback, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import client from '../api/client'
import { categoriesState } from '../global-state/categoriesState'

const useFetchCategories = () => {
    const setCategories = useSetRecoilState(categoriesState)

    return async () => {
        try {
            const res = await client.get('categories')
            setCategories(res.data.data)
        } catch (e) {
            console.log('Impossible to fetch categories', e)
        }
    }
}

export default useFetchCategories
