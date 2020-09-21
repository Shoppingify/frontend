import React from 'react'
import { motion } from 'framer-motion'
import { MdDelete, MdRemove, MdAdd } from 'react-icons/md'

const buttonVariants = {
    hide: {
        opacity: 0,
        x: 24,
    },
    show: {
        opacity: 1,
        x: 0,
    },
}

const quantityTextVariants = {
    hide: {
        x: 24,
    },
    show: {
        x: 0,
    },
}

type PropTypes = {
    editing: boolean
    handleItemDelete: () => void
    handleInOrDecBtnClick: (inc: boolean) => void
    quantity: number
}

const ShoppingListItemQuantity: React.FC<PropTypes> = React.memo(
    ({ editing, handleItemDelete, handleInOrDecBtnClick, quantity }) => {
        return (
            <motion.div
                initial="hide"
                animate={editing ? 'show' : 'hide'}
                className={`flex ${
                    editing ? 'bg-white' : undefined
                } rounded-12 overflow-hidden absolute right-0 transition-colors duration-500 ease-in-out`}
            >
                {/** Delete button */}
                <motion.button
                    disabled={!editing}
                    variants={buttonVariants}
                    className="bg-primary rounded-12 p-1 origin-right"
                    style={{
                        pointerEvents: editing ? 'all' : 'none',
                    }}
                    onClick={handleItemDelete}
                >
                    <MdDelete color="#fff" size={24} />
                </motion.button>
                {/** Quantity increment button */}
                <motion.button
                    variants={buttonVariants}
                    onClick={() => handleInOrDecBtnClick(false)}
                    className="mx-2 origin-right"
                    disabled={!editing}
                    style={{
                        pointerEvents: editing ? 'all' : 'none',
                    }}
                >
                    <MdRemove color="#F9A109" size={24} />
                </motion.button>
                {/** H3 that displays quantitx */}
                <motion.h3
                    variants={quantityTextVariants}
                    className="rounded-24 border-primary border-2 text-primary font-bold text-sm px-6 py-1 my-1"
                >
                    <span>{quantity}</span>
                    {quantity > 1 ? ' pcs' : ' pc'}
                </motion.h3>
                {/** Quantity decrement button */}
                <motion.button
                    variants={buttonVariants}
                    onClick={() => handleInOrDecBtnClick(true)}
                    className="mx-2 origin-right"
                    disabled={!editing}
                    style={{
                        pointerEvents: editing ? 'all' : 'none',
                    }}
                >
                    <MdAdd color="#F9A109" size={24} />
                </motion.button>
            </motion.div>
        )
    }
)

export default ShoppingListItemQuantity
