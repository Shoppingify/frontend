import React, { useCallback } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import BasicInput from './BasicInput'
import CategorySelect from './CategorySelect'
import Button from '../../button/Button'
import { useRecoilState } from 'recoil'
import {
    sidebarState,
    userItemsState,
    ADD_SHOPPING_LIST,
    SHOW_ITEM,
    currentItemState,
} from '../../../global-state/atoms'
import client from '../../../api/client'

// Validation schema
const ItemSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    note: Yup.string(),
    image: Yup.string().url(),
    category: Yup.string().required('Required'),
})

const ItemForm: React.FC = () => {
    const [lists, setLists] = useRecoilState(userItemsState)
    const [sidebarType, setSidebarType] = useRecoilState(sidebarState)
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
            // TODO Change to show the added item
            resetForm({ name: '', note: '', image: '', category: '' })
            setCurrentItem(res.data.data)
            setSidebarType(SHOW_ITEM)
            console.log('res', res.data)
        } catch (e) {
            console.log('Add item error', e)
            setSubmitting(false)
        }
    }

    // Cancel the addition of a new item
    const cancel = () => {
        setSidebarType(ADD_SHOPPING_LIST)
    }

    return (
        <Formik
            initialValues={{ name: '', note: '', image: '', category: '' }}
            validationSchema={ItemSchema}
            onSubmit={addItem}
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
                            text="Save"
                            disabled={isSubmitting}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ItemForm
