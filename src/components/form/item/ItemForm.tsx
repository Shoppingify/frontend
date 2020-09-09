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
        setSubmitting(true)
        try {
            const response = await client.post('items', values)
            const itemsResponse = await client.get('items')
            setLists(itemsResponse.data.data)

            resetForm({ name: '', note: '', image: '', category: '' })
            setCurrentItem(response.data.data)
            setSidebarType(SHOW_ITEM)
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
            const response = await client.put(`items/${currentItem.id}`, values)

            const itemsResponse = await client.get('items')
            setLists(itemsResponse.data.data)

            resetForm({ name: '', note: '', image: '', category: '' })
            setCurrentItem(response.data.data)
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
