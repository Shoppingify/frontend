import React, { useCallback } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import BasicInput from './BasicInput'
import CategorySelect from './CategorySelect'
import Button from '../../button/Button'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
    sidebarState,
    userItemsState,
    ADD_SHOPPING_LIST,
    SHOW_ITEM,
    currentItemState,
} from '../../../global-state/atoms'
import client from '../../../api/client'
import { ItemType, ListOfItems } from '../../../types/items/types'

// Validation schema
const ItemSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    note: Yup.string(),
    image: Yup.string().url(),
    category: Yup.string().required('Required'),
})

const ItemForm: React.FC = () => {
    const [lists, setLists] = useRecoilState(userItemsState)
    const setSidebarType = useSetRecoilState(sidebarState)
    const [currentItem, setCurrentItem] = useRecoilState(currentItemState)

    // Add a new item
    const addItem = async (values: any, { setSubmitting, resetForm }: any) => {
        console.log('Values', values)
        setSubmitting(true)
        try {
            const res = await client.post('items', values)

            // Add the item to the list
            const index = lists.findIndex(
                (list: any) =>
                    list.category.toLowerCase() ===
                    values.category.toLowerCase()
            )
            // I already have the category
            if (index > -1) {
                const newLists: any = [...lists]
                newLists[index] = {
                    ...newLists[index],
                    items: newLists[index]['items'].concat(res.data.data),
                }
                console.log('newLists', newLists)
                setLists(newLists)
            } else {
                // I don't have the category
                let newLists: any = [...lists]
                newLists.push({
                    category: values.category,
                    items: [].concat(res.data.data),
                })
                console.log('New lists here', newLists)
                setLists(newLists)
            }
            resetForm({ name: '', note: '', image: '', category: '' })
            setCurrentItem(res.data.data)
            setSidebarType(SHOW_ITEM)
            console.log('res', res.data)
        } catch (e) {
            console.log('Add item error', e)
            setSubmitting(false)
        }
    }

    const updateItem = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        if (!currentItem) return
        console.log('values in update', values)
        setSubmitting(true)
        try {
            const res = await client.put(`items/${currentItem.id}`, values)

            // If the category is the same, I just need to update the item
            if (
                values.category.toLowerCase() ===
                currentItem.categoryName.toLowerCase()
            ) {
                const index = lists.findIndex((list: any) => {
                    return (
                        list.category.toLowerCase() ===
                        currentItem.categoryName.toLowerCase()
                    )
                })
                console.log('index', index)
                // This category already exists
                if (index > -1) {
                    const itemIndex = lists[index].items.findIndex(
                        (item) => item.id === currentItem.id
                    )

                    console.log('itemIndex', itemIndex)
                    // I found the item so I can update it
                    if (itemIndex > -1) {
                        let newLists = [...lists]
                        console.log('newlists[index]', newLists[index])
                        console.log(
                            'newLits items',
                            newLists[index].items[itemIndex]
                        )
                        let newItems = [...newLists[index].items]
                        newItems[itemIndex] = res.data.data
                        console.log('lists in update method', newItems)
                        newLists[index] = {
                            ...newLists[index],
                            items: newItems,
                        }
                        setLists(newLists)
                    }
                }
            }

            // If the category has changed, I need to remove the previous item
            if (
                values.category.toLowerCase() !==
                currentItem.categoryName.toLocaleLowerCase()
            ) {
                // If the category exists

                // Index of the "old" category
                const oldIndex = lists.findIndex((list: any) => {
                    return (
                        list.category.toLowerCase() ===
                        currentItem.categoryName.toLowerCase()
                    )
                })

                const newIndex = lists.findIndex((list: any) => {
                    return (
                        list.category.toLowerCase() ===
                        values.category.toLowerCase()
                    )
                })

                if (oldIndex > -1) {
                    // I need to remove the item from the old category
                    const itemIndex = lists[oldIndex].items.findIndex(
                        (item) => item.id === currentItem.id
                    )

                    let newLists = [...lists]

                    if (itemIndex > -1) {
                        let oldItems = [...newLists[oldIndex].items]
                        oldItems.splice(itemIndex, 1)
                        console.log('Old items', oldItems)

                        // If I don't have any items in that category
                        // I remove the category from the lists array

                        if (oldItems.length === 0) {
                            // Not sure if I should remove the category
                            // newLists.splice(oldIndex, 1)
                        } else {
                            newLists[oldIndex] = {
                                ...newLists[oldIndex],
                                items: oldItems,
                            }
                        }
                    }

                    // The new Category exists
                    if (newIndex > -1) {
                        let newItems = [...newLists[newIndex].items]
                        newItems.push(res.data.data)
                        newLists[newIndex] = {
                            ...newLists[newIndex],
                            items: newItems,
                        }
                    } else {
                        // It's a brand new category
                        newLists.push({
                            category: values.category,
                            items: [].concat(res.data.data),
                        })
                    }
                    setLists(newLists)
                }
            }
            resetForm({ name: '', note: '', image: '', category: '' })
            setCurrentItem(res.data.data)
            setSidebarType(SHOW_ITEM)
        } catch (e) {
            console.log('Error updating', e)
            setSubmitting(false)
        }
    }

    // Cancel the addition of a new item
    const cancel = () => {
        setCurrentItem(null)
        setSidebarType(ADD_SHOPPING_LIST)
    }

    const getInitialValues = () => {
        return {
            name: currentItem?.name || '',
            note: currentItem?.note || '',
            image: currentItem?.image || '',
            category: currentItem?.categoryName || '',
        }
    }

    return (
        <Formik
            initialValues={getInitialValues()}
            validationSchema={ItemSchema}
            onSubmit={!currentItem ? addItem : updateItem}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col h-full justify-between">
                    <div>
                        <BasicInput
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter a name"
                        />
                        <BasicInput
                            label="Note (optional)"
                            name="note"
                            placeholder="Enter a note"
                            as="textarea"
                        />
                        <BasicInput
                            label="Image (optional)"
                            type="text"
                            name="image"
                            placeholder="Enter a url"
                        />
                        <CategorySelect
                            label="Category"
                            name="category"
                            placeholder="Enter a category"
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <Button onClick={cancel} modifier="" text="Cancel" />
                        <Button
                            type="submit"
                            modifier="primary"
                            text={`${currentItem ? 'Edit' : 'Save'}`}
                            disabled={isSubmitting}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ItemForm
