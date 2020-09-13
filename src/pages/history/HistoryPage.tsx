import React, { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'

import { useRecoilValue } from 'recoil'
import { userState } from '../../App'
import List from '../../components/cards/List'
import client from '../../api/client'

/**
 * Simple history page component
 */
const HistoryPage = () => {
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)

    /**
     * Fetch the user's lists
     */
    const fetchLists = useCallback(async () => {
        try {
            const response = await client.get('lists')

            const { data } = response.data
            // Group data by date
            const sorted = groupByDate(
                data.filter((item: any) => item.status !== 'active')
            )

            setLists(() => sorted)
        } catch (e) {
            console.log('error', e)
        } finally {
            setLoading(false)
        }
    }, [])

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

    useEffect(() => {
        fetchLists()
    }, [])

    return (
        <div className="flex flex-col px-10 bg-gray-extra-light h-full">
            <h1 className="text-2xl font-bold pt-8">Shopping History</h1>

            {/* TODO: Make a proper loader */}
            {loading && <div>Loading...</div>}

            {/* Lists */}
            {lists.map((item: any) => (
                <div className="mt-10 px-4 overflow-y-auto" key={item.date}>
                    <h3 className="text-sm mb-4 font-medium">{item.date}</h3>
                    <ul>
                        {item.lists.map((list: any) => (
                            <List key={list.id} list={list} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default HistoryPage
