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

const RenderShopList: React.FC<PropTypes> = ({ editing }) => {
    const shopList = useRecoilValue(shopListState)

    return (
        <>
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
            {/* Handle no items in shopping list */}
            <AnimatePresence exitBeforeEnter>
                {shopList.length === 0 && (
                    <div className="w-full flex flex-wrap flex-grow items-end overflow-x-hidden">
                        <div className="w-full flex justify-center items-center">
                            <motion.p
                                initial={{ opacity: 0 }}
                                exit={{
                                    opacity: 0,
                                    transition: { delay: 0 },
                                }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="font-bold text-xl"
                            >
                                No items
                            </motion.p>
                        </div>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{
                                x: 100,
                                opacity: 0,
                                transition: { delay: 0 },
                            }}
                            transition={{ delay: 0.5 }}
                            className="w-full"
                            style={{ height: 'fit-content' }}
                        >
                            <ShoppingAppSVG
                                style={{ transform: 'scaleX(-1)' }}
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default RenderShopList
