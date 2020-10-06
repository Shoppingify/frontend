import React from 'react'

// Global state
import { useSetRecoilState } from 'recoil'
import { currentItemState } from '../../global-state/currentItemState'
import { sidebarState, ADD_NEW_ITEM } from '../../global-state/sidebarState'

// Components
import Button from '../button/Button'
import Heading from '../heading/Heading'

// Assets
import SupermarketSVG from '../../assets/supermarket.svg'

const AddNewItem: React.FC = React.memo(() => {
    // Global state
    const setSidebarType = useSetRecoilState(sidebarState)
    const setCurrentItem = useSetRecoilState(currentItemState)

    return (
        <div className="bg-purple px-4 py-4 sm:py-6 flex justify-center items-center rounded-24">
            <div className="w-1/3">
                <SupermarketSVG />
            </div>
            <div className="w-2/3">
                <Heading level={3} className="text-white font-bold">
                    Didn't find what you need?
                </Heading>
                <Button
                    onClick={() => {
                        setSidebarType(ADD_NEW_ITEM)
                        setCurrentItem(null)
                    }}
                    modifier="white"
                    className="text-black mt-4"
                >
                    Add item
                </Button>
            </div>
        </div>
    )
})

export default AddNewItem
