import React, { useState } from 'react'
import { MdModeEdit, MdSave } from 'react-icons/md'
import client from '../../api/client'
import Button from '../button/Button'

interface CategoryTitleProps {
    category: string
    category_id: number
    categoryUpdated: (cat: any) => void
}

const iconStyle = 'text-2xl cursor-pointer'

const CategoryTitle = ({
    category,
    category_id,
    categoryUpdated,
}: CategoryTitleProps) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(category)
    const [errors, setErrors] = useState<string | null>(null)

    const toggleEditMode = () => {
        setEditMode((editMode) => (editMode = !editMode))
    }

    const saveCategory = async () => {
        setErrors(null)

        if (name.length < 2) {
            setErrors('category must be at least 2 characters')
            return
        }
        try {
            const res = await client.put(`categories/${category_id}`, { name })
            setEditMode(false)
            categoryUpdated(res.data.data)
        } catch (e) {
            console.log('Error while updating the category', e)
            if (e.response && e.response.data) {
                setErrors(e.response.data.message)
            } else {
                if (e.message) {
                    setErrors(e.message)
                }
            }
        }
    }

    const cancel = () => {
        setName(category)
        setEditMode(false)
    }
    return (
        <>
            {!editMode && (
                <div className="group flex items-center mb-4">
                    <h3
                        onClick={toggleEditMode}
                        className="text-lg font-bold mr-4 cursor-pointer"
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
                <div className="mb-4">
                    <div className="flex items-center">
                        <input
                            className="p-2 mr-4 rounded border border-gray-input"
                            type="text"
                            name="category"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    saveCategory()
                                }
                            }}
                        />

                        <MdSave
                            className={`${iconStyle} mr-4 hover:text-primary transition-colors duration-300`}
                            onClick={saveCategory}
                        />
                        <Button
                            modifier=""
                            className="text-black"
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                    </div>
                    {errors && (
                        <span className="text-danger text-sm">{errors}</span>
                    )}
                </div>
            )}
        </>
    )
}

export default CategoryTitle
