import React, { useCallback, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import client from '../api/client'
import {
    categoriesState,
    categoriesLoadedState,
} from '../global-state/categoriesState'
import { itemsState } from '../global-state/itemsState'

const useFetchItems = () => {
    const setItems = useSetRecoilState(itemsState)

    return useCallback(async () => {
        try {
            const res = await client.get('items')
            setItems(res.data.data)
        } catch (e) {
            console.log('Impossible to fetch items', e)
        }
    }, [])
}
export default useFetchItems
