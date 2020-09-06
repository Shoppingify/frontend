import React, { useEffect } from 'react'

import { motion, useAnimation } from 'framer-motion'
import { useSetRecoilState } from 'recoil'
import { shopListDataState } from '../../global-state/atoms'
import { MdRemove, MdAdd } from 'react-icons/md'

interface Props {
    name: string
    quantity: number
    category: string
    id: number
}

const itemVariants = {
    hidden: {
        y: 100,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
    },
}

const buttonVariants = {
    rest: {
        opacity: 0,
        width: 0,
    },
    hover: {
        opacity: 1,
        width: 24,
    },
}

const ShoppingListItem: React.FC<Props> = ({
    name,
    quantity,
    id,
    category,
}) => {
    useEffect(() => {
        return () => {
            console.log('Unmounting single item')
        }
    }, [])

    const controls = useAnimation()

    const setShopList = useSetRecoilState(shopListDataState)

    function handleClick(incOrDec: string) {
        //@ts-ignore
        // TODO refactor
        setShopList((current: any) => {
            const newItems = JSON.parse(JSON.stringify(current))

            // Find the item in current state
            const catIndex = newItems.findIndex((x: any) => x.category === category)
            const itemIndex = newItems[catIndex].items.findIndex(
                (x: any) => x.id === id
            )

            if (incOrDec === 'inc')
                newItems[catIndex].items[itemIndex].quantity += 1
            if (incOrDec === 'dec')
                newItems[catIndex].items[itemIndex].quantity -= 1

            return newItems
        })
    }

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="flex justify-between items-center mb-6 xl:flex-wrap group"
        >
            <h2 className="xl:w-full">{name}</h2>
            <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="flex hover:bg-white rounded-lg py-1"
            >
                <motion.button
                    variants={buttonVariants}
                    onClick={() => handleClick('dec')}
                    className="group-hover:mx-2"
                >
                    <MdRemove color="#F9A109" size={24} />
                </motion.button>
                <h3 className="rounded-24 border-primary border-2 text-primary font-bold text-sm px-4 py-2">
                    <span>{quantity}</span>
                    {quantity > 1 ? ' pcs' : ' pc'}
                </h3>
                <motion.button
                    variants={buttonVariants}
                    onClick={() => handleClick('inc')}
                    className="group-hover:mx-2"
                >
                    <MdAdd color="#F9A109" size={24} />
                </motion.button>
            </motion.div>
        </motion.div>
    )
}

export default ShoppingListItem
