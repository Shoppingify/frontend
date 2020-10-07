import React, { useRef } from 'react'

// Libs
import { motion } from 'framer-motion'

// Global state
import { useRecoilValue } from 'recoil'
import { shopListState } from '../../../global-state/shopListState'

// Components
import ShoppingListSingleCategory from './ShoppingListSingleCategory'

// Types
type PropTypes = {
    editing: boolean
}

const RenderShopList: React.FC<PropTypes> = React.memo(({ editing }) => {
    const shopList = useRecoilValue(shopListState)
    const renderListRef = useRef(document.createElement('div'))

    return (
        <div ref={renderListRef}>
            {shopList.map((category: any, index: number) => (
                <ShoppingListSingleCategory
                    key={index}
                    category={category}
                    catIndex={index}
                    editing={editing}
                />
            ))}
        </div>
    )
})

export default RenderShopList
