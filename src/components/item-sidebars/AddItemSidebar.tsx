import React from 'react'
import { useRecoilValue } from 'recoil'
import ItemForm from '../form/item/ItemForm'
import { currentItemState } from '../../global-state/currentItemState'

const AddItemSidebar: React.FC = () => {
    const currentItem = useRecoilValue(currentItemState)
    return (
        <div className="flex flex-col h-full">
            <h3 className="text-2xl mb-6 font-medium">
                {currentItem ? 'Edit an ' : 'Add a new '}item
            </h3>
            <ItemForm />
        </div>
    )
}

export default AddItemSidebar
