import React, { useEffect } from 'react'

// Global state
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { itemModifiedState } from '../../../global-state/itemsState'
import { currentItemState } from '../../../global-state/currentItemState'
import {
    SHOW_ITEM,
    SHOW_SHOPPING_LIST,
    sidebarState,
} from '../../../global-state/sidebarState'
import { categoriesState } from '../../../global-state/categoriesState'

// Libs
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useLocation } from 'react-router-dom'

// Api client
import client from '../../../api/client'

// Components
import Button from '../../button/Button'
import BasicInput from '../../form-elements/BasicInput'
import CategorySelect from '../../form-elements/CategorySelect'

// Hooks
import useFetchItems from '../../../hooks/useFetchItems'
import useFetchCategories from '../../../hooks/useFetchCategories'
import useLoadActiveListData from '../../../hooks/useLoadActiveListData'

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

    // Hooks
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

    // Update item
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

    /**
     * Cancels the addition of a new item
     */
    const cancel = () => {
        setCurrentItem(null)
        setSidebarType(SHOW_SHOPPING_LIST)
    }

    /**
     * Gets item initial values
     */
    const getInitialValues = () => {
        return {
            name: currentItem?.name || '',
            note: currentItem?.note || '',
            image: currentItem?.image || '',
            category: currentItem?.categoryName || '',
        }
    }

    /**
     * Checks if category exists
     */
    const categoryExists = (category: string) => {
        return categories.find(
            (cat) => cat.name.toLowerCase() === category.toLowerCase()
        )
    }

    /**
     * Effect runs on currentItem change, fetches initial values/resets
     */
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
                            autoComplete="off"
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
                            type="button"
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
