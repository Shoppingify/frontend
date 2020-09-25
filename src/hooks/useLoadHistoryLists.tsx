import { format } from 'date-fns'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import client from '../api/client'
import { shopListHistoryState } from '../global-state/shopListHistoryState'

/**
 * Group the lists by date
 * @param {List[]} data:
 */
const groupByDate = (data: any) => {
    return data.reduce((acc: any, value: any) => {
        const date = format(new Date(value.created_at), 'MMMM yyyy')

        if (acc.length === 0) {
            acc.push({
                date,
                lists: [].concat(value),
            })
        } else {
            const index: number = acc.findIndex((i: any) => i.date === date)
            if (index !== -1) {
                acc[index].lists.push(value)
            } else {
                acc.push({
                    date,
                    lists: [].concat(value),
                })
            }
        }
        return acc
    }, [])
}

const useLoadHistoryLists = () => {
    const setLists = useSetRecoilState(shopListHistoryState)
    return async () => {
        try {
            const response = await client.get('lists')

            const { data } = response.data
            // Group data by date
            const sorted = groupByDate(
                data.filter((item: any) => item.status !== 'active')
            )

            setLists(sorted)
        } catch (e) {
            console.log(e)
        }
    }
}

export default useLoadHistoryLists
