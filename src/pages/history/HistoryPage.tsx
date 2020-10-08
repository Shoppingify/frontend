import React, { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'

import List from '../../components/cards/List'
import { useRecoilValue } from 'recoil'
import BasicLoader from '../../components/loader/BasicLoader'
import { motion } from 'framer-motion'
import { fadeIn } from '../../animation/variants/move-in/fade-in'
import {
    shopListHistoryLoadingState,
    shopListHistoryState,
} from '../../global-state/shopListHistoryState'

/**
 * Simple history page component
 */

const HistoryPage = () => {
    const lists = useRecoilValue(shopListHistoryState)
    const loading = useRecoilValue(shopListHistoryLoadingState)

    return (
        <div className="container mx-auto flex flex-col bg-gray-extra-light h-full">
            <h1 className="text-2xl font-bold pt-8 mb-8 text-center">
                Shopping History
            </h1>

            {/* TODO: Make a proper loader */}
            {lists.length === 0 && !loading && (
                <div className="flex justify-center">
                    <h3 className="text-xl font-bold">
                        No list in the history yet
                    </h3>
                </div>
            )}

            {/* Lists */}
            <div className="overflow-y-auto px-3">
                {lists.map((item: any) => (
                    <div className="mt-10" key={item.date}>
                        <h3 className="text-sm mb-4 font-medium">
                            {item.date}
                        </h3>
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
        </div>
    )
}

export default HistoryPage
