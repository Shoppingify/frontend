import React from 'react'
import {} from 'recoil'
import ItemForm from '../form/item/ItemForm'

const AddItemSidebar: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            <h3 className="text-2xl mb-6 font-medium">Add a new item</h3>
            <ItemForm />
        </div>
    )
}

export default AddItemSidebar
