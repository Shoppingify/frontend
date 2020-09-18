import React from 'react'
import { useRecoilValue } from 'recoil'
import ItemForm from '../form/item/ItemForm'
import { currentItemState } from '../../global-state/currentItemState'
import { motion } from 'framer-motion'

const AddItemSidebar: React.FC = () => {
    const currentItem = useRecoilValue(currentItemState)
    return (
        <motion.div
            key="additemkey"
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            className="flex flex-col h-full p-8 overflow-hidden"
        >
            <h3 className="text-2xl mb-6 font-medium">
                {currentItem ? 'Edit an ' : 'Add a new '}item
            </h3>
            <ItemForm />
        </motion.div>
    )
}

export default AddItemSidebar
