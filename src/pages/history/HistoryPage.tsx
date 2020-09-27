import React, { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'

import List from '../../components/cards/List'
import client from '../../api/client'
import { useRecoilState, useRecoilValue } from 'recoil'
import BasicLoader from '../../components/loader/BasicLoader'
import useLoadHistoryLists from '../../hooks/useFetchHistoryLists'
import { shopListHistoryState } from '../../global-state/shopListHistoryState'

/**
 * Simple history page component
 */
const HistoryPage = () => {
    const [mounted, setMounted] = useState(false)
    const lists = useRecoilValue(shopListHistoryState)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex flex-col px-2 lg:px-5 bg-gray-extra-light h-full">
            <h1 className="text-2xl font-bold pt-8 mb-8">Shopping History</h1>

            {/* TODO: Make a proper loader */}
            {lists.length === 0 && (
                <div className="flex justify-center">
                    <h3 className="text-xl font-bold">
                        No list in the history yet ;)
                    </h3>
                </div>
            )}

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
