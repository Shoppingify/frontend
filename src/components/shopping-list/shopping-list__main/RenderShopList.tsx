import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

// Global state
import { useRecoilValue } from 'recoil'
import { shopListState } from '../../../global-state/shopListState'

// Components
import Heading from '../../heading/Heading'
import ShoppingListItem from '../shopping-list__item/ShoppingListItem'

// Assets
import ShoppingAppSVG from '../../../assets/undraw_shopping_app_flsj.svg'

// Types
type PropTypes = {
    editing: boolean
}

const RenderShopList: React.FC<PropTypes> = React.memo(({ editing }) => {
    const shopList = useRecoilValue(shopListState)

    return (
        <motion.div
            key="renderWithItems"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.5 } }}
        >
            {shopList.map((category: any, index: number) => (
                <div key={index} className="mb-12">
                    <Heading level={3} className="text-gray-light mb-6">
                        {category.category}
                    </Heading>
                    <ul>
                        {category.items.map((item: any, indexItem: number) => {
                            return (
                                <li key={`${item.name}__${indexItem}`}>
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
                                </li>
                            )
                        })}
                    </ul>
                </div>
            ))}
        </motion.div>
    )
})

export default RenderShopList
