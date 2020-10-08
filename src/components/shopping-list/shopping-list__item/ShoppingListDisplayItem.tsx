import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Checkbox from '../../form-elements/Checkbox'

interface ShoppingListDisplayItem {
    editing: boolean
    name: string
    done: boolean
    quantity: number
    handleCompleteStatus: () => void
}

const ShoppingListDisplayItem = ({
    editing,
    name,
    done,
    quantity,
    handleCompleteStatus,
}: ShoppingListDisplayItem) => {
    return (
        <label
            className={`flex items-center justify-between w-full lg:pl-4 cursor-pointer`}
        >
            {/** Checkbox */}
            <div className="flex items-center">
                <AnimatePresence>
                    {!editing && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            className="mr-2"
                        >
                            <Checkbox
                                checked={done}
                                onChange={handleCompleteStatus}
                                className="font-semibold"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/** Item name */}
                <h2
                    className={`lg:w-full xl:w-auto font-semibold break-all mr-1 ${
                        done ? 'line-through' : ''
                    }`}
                >
                    {name}
                </h2>
            </div>
            <h3 className=" flex-none rounded-24 border-primary border-2 text-primary font-bold text-sm px-6 py-1 my-1">
                <span>
                    {quantity} {quantity > 1 ? ' pcs' : ' pc'}
                </span>
            </h3>
        </label>
    )
}

export default React.memo(ShoppingListDisplayItem)
