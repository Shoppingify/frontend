import React, { useState } from 'react'
import { useEffect } from 'react'
import { MdModeEdit, MdSave } from 'react-icons/md'
import client from '../../api/client'
import Button from '../button/Button'
import ContentEditable from '../content/ContentEditable'
import Heading from '../heading/Heading'

interface CategoryTitleProps {
    category: string
    category_id: number
    categoryUpdated: (cat: any) => void
}

const iconStyle = 'text-2xl cursor-pointer text-black '

const CategoryTitle: React.FC<CategoryTitleProps> = ({
    category,
    category_id,
    categoryUpdated,
}) => {
    // Local state
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(category)
    const [errors, setErrors] = useState<string | null>(null)

    /**
     * Makes the category title editable
     */
    const toggleEditMode = () => {
        setEditMode((editMode) => (editMode = !editMode))
    }

    /**
     * Save category name to the db
     */
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
            setErrors(null)
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
        setErrors(null)
    }
    return (
        <div className="group flex items-center mb-4">
            <Heading
                level={2}
                className={`font-bold mr-4 rounded-lg ${
                    editMode ? 'bg-white border-gray-input shadow-item ' : ''
                }`}
            >
                <ContentEditable
                    disabled={!editMode}
                    style={{ height: 'fit-content' }}
                    html={name}
                    onChange={(e: {
                        target: { value: React.SetStateAction<string> }
                    }) => setName(e.target.value)}
                    className="p-2"
                    enterPressCallback={saveCategory}
                />
            </Heading>
            {editMode ? (
                <>
                    <Button className="group h-full">
                        <MdSave
                            className={`${iconStyle} group-hover:text-primary transition-colors duration-300`}
                            onClick={saveCategory}
                        />
                    </Button>
                    <Button modifier="" className="text-black" onClick={cancel}>
                        Cancel
                    </Button>
                </>
            ) : (
                <Button>
                    <MdModeEdit
                        onClick={toggleEditMode}
                        className={`${iconStyle} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                </Button>
            )}

            {errors && <span className="text-danger text-sm">{errors}</span>}
        </div>
    )
}

export default CategoryTitle
