import { Form, Formik } from 'formik'

import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import * as Yup from 'yup'
import client from '../../../api/client'
import { itemModifiedState, itemsState } from '../../../global-state/itemsState'
import { currentItemState } from '../../../global-state/currentItemState'
import {
    ADD_SHOPPING_LIST,
    SHOW_ITEM,
    SHOW_SHOPPING_LIST,
    sidebarState,
} from '../../../global-state/sidebarState'
import Button from '../../button/Button'
import BasicInput from '../../form-elements/BasicInput'
import CategorySelect from '../../form-elements/CategorySelect'
import useFetchItems from '../../../hooks/useFetchItems'
import useFetchCategories from '../../../hooks/useFetchCategories'
import { categoriesState } from '../../../global-state/categoriesState'
import useLoadActiveListData from '../../../hooks/useLoadActiveListData'
import { useLocation } from 'react-router-dom'

// Validation schema
const ItemSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    note: Yup.string(),
    image: Yup.string().url(),
    category: Yup.string().min(2).required('Required'),
})

const ItemForm: React.FC = () => {
    const location = useLocation()

    // Recoil state
    const setSidebarType = useSetRecoilState(sidebarState)
    const [currentItem, setCurrentItem] = useRecoilState(currentItemState)
    const categories = useRecoilValue(categoriesState)
    const setItemModified = useSetRecoilState(itemModifiedState)

    const fetchItems = useFetchItems()
    const fetchCategories = useFetchCategories()
    const fetchActiveList = useLoadActiveListData()

    // Add a new item
    const addItem = async (values: any, { setSubmitting, resetForm }: any) => {
        setSubmitting(true)
        try {
            const response = await client.post('items', values)

            // Check if the categories exists?
            if (!categoryExists(values.category)) {
                await fetchCategories()
            }
            await fetchItems()

            resetForm({ name: '', note: '', image: '', category: '' })
            setCurrentItem(response.data.data)
            setSidebarType(SHOW_ITEM)
        } catch (e) {
            setSubmitting(false)
        }
    }

    const updateItem = async (
        values: any,
        { setSubmitting, resetForm }: any
    ) => {
        if (!currentItem) return
        setSubmitting(true)
        try {
            const response = await client.put(`items/${currentItem.id}`, values)
            if (!categoryExists(values.category)) {
                await fetchCategories()
            }
            await fetchItems()
            await fetchActiveList()

            if (location.pathname.startsWith('/history/')) {
                setItemModified(true)
            }

            resetForm({ name: '', note: '', image: '', category: '' })
            setCurrentItem(response.data.data)
            setSidebarType(SHOW_ITEM)
        } catch (e) {
            setSubmitting(false)
        }
    }

    // Cancel the addition of a new item
    const cancel = () => {
        setCurrentItem(null)
        setSidebarType(SHOW_SHOPPING_LIST)
    }

    const getInitialValues = () => {
        return {
            name: currentItem?.name || '',
            note: currentItem?.note || '',
            image: currentItem?.image || '',
            category: currentItem?.categoryName || '',
        }
    }

    const categoryExists = (category: string) => {
        return categories.find(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
        )
    }

    useEffect(() => {
        getInitialValues()
    }, [currentItem])

    return (
        <Formik
            initialValues={getInitialValues()}
            validationSchema={ItemSchema}
            onSubmit={!currentItem?.id ? addItem : updateItem}
            enableReinitialize={true}
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
                        <Button
                            className="text-black mr-2"
                            onClick={cancel}
                            modifier=""
                        >
                            cancel
                        </Button>
                        <Button
                            type="submit"
                            modifier="primary"
                            disabled={isSubmitting}
                        >
                            {`${currentItem?.id ? 'Edit' : 'Save'}`}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ItemForm
