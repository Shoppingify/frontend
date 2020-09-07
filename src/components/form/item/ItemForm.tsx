import React, { useCallback } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import BasicInput from './BasicInput'
import CategorySelect from './CategorySelect'
import Button from '../../button/Button'
import { useRecoilState } from 'recoil'
import { sidebarState, SHOW_SHOPPING_LIST } from '../../../global-state/atoms'
import client from '../../../api/client'

// Validation schema
const ItemSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    note: Yup.string(),
    image: Yup.string().url(),
    category: Yup.string().required('Required'),
})

const ItemForm: React.FC = () => {
    const [sidebarType, setSidebarType] = useRecoilState(sidebarState)

    // Add a new item
    const addItem = async (values: object) => {
        console.log('Values', values)
        try {
            const res = await client.post('items', values)
            console.log('res', res.data)
        } catch (e) {
            console.log('Add item error', e)
        }
    }

    // Cancel the addition of a new item
    const cancel = useCallback(() => {
        setSidebarType(SHOW_SHOPPING_LIST)
    }, [])

    return (
        <Formik
            initialValues={{ name: '', note: '', image: '', category: '' }}
            validationSchema={ItemSchema}
            onSubmit={addItem}
        >
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
                    <Button type="submit" modifier="primary" text="Save" />
                </div>
            </Form>
        </Formik>
    )
}

export default ItemForm
