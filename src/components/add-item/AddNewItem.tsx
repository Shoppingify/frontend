import React from 'react'

// Global state
import { useSetRecoilState } from 'recoil'
import { currentItemState } from '../../global-state/currentItemState'
import { sidebarState, ADD_NEW_ITEM } from '../../global-state/sidebarState'
import Button from '../button/Button'

const AddNewItem = () => {
    const setSidebarType = useSetRecoilState(sidebarState)
    const setCurrentItem = useSetRecoilState(currentItemState)
    return (
        <div className="bg-secondary p-4 flex justify-center items-center">
            <Button
                onClick={() => {
                    setSidebarType(ADD_NEW_ITEM)
                    setCurrentItem(null)
                }}
                modifier="primary"
            >
                Add a new item
            </Button>
        </div>
    )
}

export default AddNewItem
