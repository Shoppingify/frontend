import React from 'react'
import { motion } from 'framer-motion'
import { MdDelete, MdRemove, MdAdd } from 'react-icons/md'

const buttonVariants = {
    hide: {
        opacity: 0,
        width: 0,
    },
    show: {
        opacity: 1,
        width: 'auto',
    },
}

type PropTypes = {
    editing: boolean
    handleItemDelete: () => void
    handleInOrDecBtnClick: (inc: boolean) => void
    quantity: number
}

const ShoppingListItemQuantity: React.FC<PropTypes> = ({
    editing,
    handleItemDelete,
    handleInOrDecBtnClick,
    quantity,
}) => {
    return (
        <motion.div
            initial="hide"
            animate={editing ? 'show' : 'hide'}
            className={`flex ${
                editing ? 'bg-white' : undefined
            } rounded-12 overflow-hidden`}
        >
            {/** Delete button */}
            <motion.button
                disabled={!editing}
                variants={buttonVariants}
                className="bg-primary rounded-12 p-1"
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
                className="mx-2"
                disabled={!editing}
                style={{
                    pointerEvents: editing ? 'all' : 'none',
                }}
            >
                <MdRemove color="#F9A109" size={24} />
            </motion.button>
            {/** H3 that displays quantitx */}
            <h3 className="rounded-24 border-primary border-2 text-primary font-bold text-sm px-4 py-2 my-1">
                <span>{quantity}</span>
                {quantity > 1 ? ' pcs' : ' pc'}
            </h3>
            {/** Quantity decrement button */}
            <motion.button
                variants={buttonVariants}
                onClick={() => handleInOrDecBtnClick(true)}
                className="mx-2"
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

export default ShoppingListItemQuantity
