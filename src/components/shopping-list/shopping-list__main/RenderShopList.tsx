import React, { useState } from 'react'

// Libs
import { motion } from 'framer-motion'

// Global state
import { useRecoilValue } from 'recoil'
import { shopListState } from '../../../global-state/shopListState'

// Components
import Heading from '../../heading/Heading'
import ShoppingListItem from '../shopping-list__item/ShoppingListItem'
import { useRef } from 'react'
import { useEffect } from 'react'
import { singleCategoryState } from '../../../global-state/categoriesState'

// Types
type PropTypes = {
    editing: boolean
}

const CategoryHeading = ({ category }: any) => {
    const singleCategory = useRecoilValue(
        singleCategoryState(category.category_id)
    )
    return (
        <Heading level={3} className="text-gray-light mb-6">
            {singleCategory.name}
        </Heading>
    )
}

const RenderShopList: React.FC<PropTypes> = React.memo(({ editing }) => {
    const shopList = useRecoilValue(shopListState)
    const renderListRef = useRef(document.createElement('div'))

    return (
        <div ref={renderListRef}>
            {shopList.map((category: any, index: number) => (
                <div key={index} className="mb-12">
                    <CategoryHeading category={category} />
                    <ul>
                        {category.items.map((item: any, indexItem: number) => {
                            return (
                                <motion.li
                                    initial={{
                                        y: 100,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                    }}
                                    key={`${item.name}__${indexItem}`}
                                >
                                    <ShoppingListItem
                                        quantity={item.quantity}
                                        name={item.name}
                                        category={item.categoryName}
                                        item_id={item.id}
                                        editing={editing}
                                        done={item.done}
                                        catIndex={index}
                                        itemIndex={indexItem}
                                    />
                                </motion.li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </div>
    )
})

export default RenderShopList
