import { ErrorMessage, Field, useField } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { isMobile, isMobileOnly } from 'react-device-detect'
import { useRecoilState, useRecoilValue } from 'recoil'
import client from '../../api/client'
import { categoriesState } from '../../global-state/categoriesState'
import { currentItemState } from '../../global-state/currentItemState'
import CategoryModal from '../modal/CategoryModal'

interface Category {
    id: number
    name: string
    user_id: number
    created_at: string
    updated_at: string
}

const CategorySelect = ({ label, ...props }: any) => {
    const [categories, setCategories] = useRecoilState(categoriesState)
    const [field, meta, helpers] = useField(props)
    const [filtered, setFiltered] = useState<any[]>([])
    const [showAutocomplete, setShowAutocomplete] = useState(false)
    const currentItem = useRecoilValue(currentItemState)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [categorySelected, setCategorySelected] = useState<any>(null)

    /**
     * Get the user's categories
     */
    const getCategories = useCallback(async () => {
        try {
            const res = await client.get('categories')
            setCategories(res.data.data)
        } catch (e) {
            console.log('Erros while fetching categories', categories)
        }
    }, [currentItem])

    useEffect(() => {
        if (categories.length > 0) {
            // I check if I the category has changed
            const categoryIndex = categories.findIndex((cat: any) => {
                return currentItem?.categoryName === cat.name
            })
            if (categoryIndex === -1) {
                getCategories()
            }
        } else {
            getCategories()
        }
        // Check if the category has changed
    }, [currentItem])

    useEffect(() => {
        console.log('called')
        let catNameUpToDate

        if (currentItem?.category_id) {
            const category = categories.find((cat: any) => {
                return cat.id === currentItem?.category_id
            })
            catNameUpToDate = category?.name
        } else {
            // It's a new item on an empty category so I need to always
            // check if the category name has been updated too
            const category = categories.find((cat: any) => {
                return (
                    cat.name.toLowerCase() ===
                    currentItem?.categoryName?.toLowerCase()
                )
            })
            catNameUpToDate = category?.name
        }

        helpers.setValue(catNameUpToDate || '', true)
        helpers.setTouched(true, true)
    }, [currentItem])

    useEffect(() => {
        // Check if a category has been updated
        if (categorySelected) {
            const category = categories.find(
                (cat: any) => cat.id === categorySelected.id
            )
            onSelected(category)
        }
    }, [categories])

    /**
     * Filter the categories while the user is typing
     * @param e
     */
    const autocomplete = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            setShowAutocomplete(true)
        } else {
            setShowAutocomplete(false)
        }
        const categoriesFiltered = categories.filter((cat: Category) =>
            cat.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFiltered(() => categoriesFiltered)

        field.onChange(e)
    }

    /**
     * Set the category if a existing category is clicked
     * @param e
     * @param cat
     */
    const onClick = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        cat: Category
    ) => {
        onSelected(cat)
    }

    /**
     * Handle keyboard navigation for the categories listing
     * @param e
     * @param cat
     */
    const onKeyDown = (e: React.KeyboardEvent, cat: Category) => {
        e.preventDefault()
        if (e.key === 'Enter') {
            onSelected(cat)
        }
    }

    const onSelected = (cat: any) => {
        setCategorySelected(cat)
        helpers.setValue(cat.name, true)
        // helpers.setTouched(true, true)
        helpers.setError(null)
        isMobile ? setShowCategoryModal(false) : setShowAutocomplete(false)
    }

    return (
        <div className="relative flex flex-col mb-3">
            <label className="font-medium" htmlFor={name}>
                {label}
            </label>
            <Field
                className="p-3 rounded-lg border-2 border-gray-input"
                onChange={autocomplete}
                autoComplete="off"
                onClick={() => (isMobile ? setShowCategoryModal(true) : null)}
                {...props}
            />
            <ErrorMessage name={props.name}>
                {(msg) => (
                    <div className="text-danger text-sm font-bold">{msg}</div>
                )}
            </ErrorMessage>

            {filtered.length > 0 && showAutocomplete && !isMobile && (
                <ul
                    style={{ maxHeight: '150px' }}
                    className="mt-2 shadow rounded-lg p-2 overflow-y-auto"
                >
                    {filtered.map((cat: Category) => (
                        <li
                            className="focus:bg-gray-medium-light hover:bg-gray-medium-light my-2 cursor-pointer rounded-lg p-2"
                            tabIndex={0}
                            key={cat.id}
                            onKeyDown={(e) => onKeyDown(e, cat)}
                            onClick={(e) => onClick(e, cat)}
                        >
                            {cat.name}
                        </li>
                    ))}
                </ul>
            )}

            {isMobile && (
                <CategoryModal
                    isVisible={showCategoryModal}
                    data={categories}
                    onSelected={onSelected}
                    onClose={() => setShowCategoryModal(false)}
                />
            )}
        </div>
    )
}

export default CategorySelect
