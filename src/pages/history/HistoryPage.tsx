import React, { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'

import List from '../../components/cards/List'
import client from '../../api/client'
import { useRecoilValue, useRecoilState } from 'recoil'
import { shopListInfoState } from '../../global-state/shopListState'
import { historyListsRefreshState } from '../../global-state/miscState'
import BasicLoader from '../../components/loader/BasicLoader'
import { motion } from 'framer-motion'
import { fadeIn } from '../../animation/variants/move-in/fade-in'

/**
 * Simple history page component
 */

const HistoryPage = () => {
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [mounted, setMounted] = useState(false)

    // global state of shopping lists
    const [historyListsRefresh, setHistoryListsRefresh] = useRecoilState(
        historyListsRefreshState
    )

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
        setMounted(true)
        fetchLists()
    }, [])

    useEffect(() => {
        if (!mounted) return

        if (historyListsRefresh.refresh) {
            fetchLists()
            setHistoryListsRefresh((current) => ({
                ...current,
                refresh: false,
            }))
        }
    }, [historyListsRefresh])

    return (
        <div className="flex flex-col px-2 lg:px-5 bg-gray-extra-light h-full">
            <h1 className="text-2xl font-bold pt-8 mb-8">Shopping History</h1>

            {/* TODO: Make a proper loader */}
            {lists.length === 0 && !loading && (
                <div className="flex justify-center">
                    <h3 className="text-xl font-bold">
                        No list in the history yet ;)
                    </h3>
                </div>
            )}

            {loading && <BasicLoader />}

            {/* Lists */}
            {lists.map((item: any) => (
                <div className="mt-10 px-4 overflow-y-auto" key={item.date}>
                    <h3 className="text-sm mb-4 font-medium">{item.date}</h3>
                    <motion.ul
                        variants={fadeIn}
                        initial="hidden"
                        animate="show"
                    >
                        {item.lists.map((list: any) => (
                            <List key={list.id} list={list} />
                        ))}
                    </motion.ul>
                </div>
            ))}
        </div>
    )
}

export default HistoryPage
