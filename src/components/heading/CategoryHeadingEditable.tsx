import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { MdModeEdit, MdSave } from 'react-icons/md'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import client from '../../api/client'
import {
    categoriesState,
    singleCategoryState,
} from '../../global-state/categoriesState'
import { currentItemState } from '../../global-state/currentItemState'
import Button from '../button/Button'
import ContentEditable from '../content/ContentEditable'
import Heading from './Heading'

interface CategoryTitleProps {
    category: string
    category_id: number
}

const iconStyle = 'text-2xl cursor-pointer text-black '

const CategoryHeadingEditable: React.FC<CategoryTitleProps> = ({
    category,
    category_id,
}) => {
    // Local state
    const singleCategory = useRecoilValue(singleCategoryState(category_id))
    const setCategory = useSetRecoilState(categoriesState)
    const setCurrentItem = useSetRecoilState(currentItemState)
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(singleCategory.name)
    const [errors, setErrors] = useState<string | null>(null)

    const editFieldRef = useRef(document.createElement('div'))

    /**
     * Makes the category title editable
     */
    const toggleEditMode = () => {
        if (editMode) {
            editFieldRef.current.focus()
        }
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

            setCategory((old: any) => {
                const newCategories: any[] = [...old]
                const index = newCategories.findIndex(
                    (cat: any) => cat.id === category_id
                )
                if (index > -1) {
                    newCategories[index] = { ...newCategories[index], name }
                    return newCategories
                }
                return old
            })
            setCurrentItem((old) => {
                return old !== null ? { ...old, categoryName: name } : old
            })

            setEditMode(false)
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
        <div className="mb-4">
            <div className="group flex items-center ">
                <Heading
                    level={2}
                    className={`font-bold mr-4 rounded-lg ${
                        editMode
                            ? 'bg-white border-gray-input shadow-item '
                            : ''
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
                        shouldFocus={true}
                    />
                </Heading>
                {editMode ? (
                    <>
                        <Button className="group h-full" onClick={saveCategory}>
                            <MdSave
                                className={`${iconStyle} group-hover:text-primary transition-colors duration-300`}
                            />
                        </Button>
                        <Button
                            modifier=""
                            className="text-black"
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button onClick={toggleEditMode}>
                        <MdModeEdit
                            className={`${iconStyle} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                    </Button>
                )}
            </div>
            {errors && editMode && (
                <span className="text-danger text-sm">{errors}</span>
            )}
        </div>
    )
}

export default CategoryHeadingEditable
