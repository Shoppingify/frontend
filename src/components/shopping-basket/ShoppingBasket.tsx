import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { shopListState } from '../../global-state/shopListState'
import { ItemType } from '../../types/items/types'
import { MdShoppingCart, MdCheck } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'

const ShoppingBasket = () => {
    const shopList = useRecoilValue(shopListState)

    const [remainingItemCount, setRemainingItemCount] = useState(0)

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    /**
     * On global shopList get info how many items are remaining
     */
    useEffect(() => {
        if (!mounted) return
        let tempCount = 0

        shopList.forEach((category: any) => {
            category.items.forEach((item: ItemType) => {
                if (!item.done) tempCount += 1
            })
        })

        setRemainingItemCount(tempCount)
    }, [shopList])

    return (
        <div className="w-16 h-16 flex justify-center items-center relative">
            {remainingItemCount !== 0 && (
                <motion.div
                    key={'count-display'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                        duration: 0.2,
                    }}
                    style={{ top: '4px', right: '4px' }}
                    className="absolute z-30 w-5 h-5 bg-danger rounded-lg text-white flex justify-center items-center text-sm "
                >
                    {remainingItemCount}
                </motion.div>
            )}
            <div
                className={`rounded-full relative flex justify-center
                 items-center  w-10 h-10  text-white text-xl transition-colors duration-500
                ${remainingItemCount === 0 ? 'bg-success' : 'bg-primary'}
            `}
            >
                <AnimatePresence exitBeforeEnter>
                    {remainingItemCount !== 0 ? (
                        <motion.div
                            key={'icon-cart'}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{
                                duration: 0.1,
                            }}
                        >
                            <MdShoppingCart color="#fff" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key={'icon-check'}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{
                                duration: 0.1,
                            }}
                        >
                            <MdCheck color="#fff" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ShoppingBasket
