import React, { useEffect, useCallback, useState } from 'react'
import client from '../../../api/client'
import { useRecoilState } from 'recoil'
import { userCategoriesState } from '../../../global-state/atoms'
import { Field, Formik, useField, ErrorMessage } from 'formik'
import BasicInput from './BasicInput'

interface Category {
    id: number
    name: string
    user_id: number
    created_at: string
    updated_at: string
}

const CategorySelect = ({ label, ...props }: any) => {
    const [categories, setCategories] = useRecoilState(userCategoriesState)
    const [field, meta, helpers] = useField(props)
    const [filtered, setFiltered] = useState([])
    const [showAutocomplete, setShowAutocomplete] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await client.get('categories')
            console.log('data', res.data)
            setCategories(res.data.data)
        }

        fetchCategories()
    }, [])

    const autocomplete = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('autocomplete', e.target.value)
        if (e.target.value.length > 0) {
            setShowAutocomplete(true)
        }
        const categoriesFiltered = categories.filter((cat: Category) =>
            cat.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        )
        setFiltered(() => categoriesFiltered)

        field.onChange(e)
    }

    const onClick = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        cat: Category
    ) => {
        helpers.setValue(cat.name, true)
        helpers.setTouched(true, true)
        setShowAutocomplete(false)
    }

    const onKeyDown = (e: React.KeyboardEvent, cat: Category) => {
        if (e.key === 'Enter') {
            helpers.setValue(cat.name, true)
            helpers.setTouched(true, true)
            setShowAutocomplete(false)
        }
    }

    return (
        <div className="flex flex-col mb-3">
            <label className="font-medium" htmlFor={name}>
                {label}
            </label>
            <Field
                className="p-3 rounded-lg border-2 border-gray-input"
                onChange={autocomplete}
                {...props}
                // {...field}
            />
            <ErrorMessage name={props.name}>
                {(msg) => (
                    <div className="text-danger text-sm font-bold">{msg}</div>
                )}
            </ErrorMessage>

            {filtered.length > 0 && showAutocomplete && (
                <ul className="mt-2 shadow rounded-lg p-2">
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
        </div>
    )
}

export default CategorySelect
