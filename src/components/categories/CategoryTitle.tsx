import React, { useState } from 'react'
import { MdModeEdit, MdSave } from 'react-icons/md'
import client from '../../api/client'
import Button from '../button/Button'

interface CategoryTitleProps {
    category: string
    category_id: number
    categoryUpdated: (cat: any) => void
}

const iconStyle =
    'text-2xl cursor-pointer hover:text-primary transition-colors duration-300'

const CategoryTitle = ({
    category,
    category_id,
    categoryUpdated,
}: CategoryTitleProps) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(category)

    const toggleEditMode = () => {
        setEditMode((editMode) => (editMode = !editMode))
    }

    const saveCategory = async () => {
        console.log('name', name)
        try {
            const res = await client.put(`categories/${category_id}`, { name })
            setEditMode(false)
            categoryUpdated(res.data.data)
        } catch (e) {
            console.log('Error while updating the category', e)
        }
    }

    const cancel = () => {
        setName(category)
        setEditMode(false)
    }
    return (
        <>
            {!editMode && (
                <div className="group flex items-center ">
                    <h3
                        onClick={toggleEditMode}
                        className="text-2xl font-bold mr-4 cursor-pointer"
                    >
                        {category}
                    </h3>
                    <MdModeEdit
                        onClick={toggleEditMode}
                        className={`${iconStyle} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                </div>
            )}
            {editMode && (
                <div className="flex items-center mb-4">
                    <input
                        className="p-2 mr-4 rounded border border-gray-input"
                        type="text"
                        name="category"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <MdSave
                        className={`${iconStyle} mr-4`}
                        onClick={saveCategory}
                    />
                    <Button modifier="" className="text-black" onClick={cancel}>
                        Cancel
                    </Button>
                </div>
            )}
        </>
    )
}

export default CategoryTitle
