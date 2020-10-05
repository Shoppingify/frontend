import React, { useState } from 'react'

// Libs
import { motion } from 'framer-motion'

// Components
import CategoryHeading from '../../heading/CategoryHeading'
import ShoppingListItem from '../shopping-list__item/ShoppingListItem'
import Button from '../../button/Button'

type PropTypes = {
    category: any
    editing: boolean
    catIndex: number
}

const ShoppingListSingleCategory: React.FC<PropTypes> = ({
    category,
    editing,
    catIndex,
}) => {
    const [expand, setExpand] = useState(false)

    return (
        <div className="mb-12">
            <CategoryHeading
                level={3}
                className="text-gray-light mb-6"
                category_id={category.category_id}
            />
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
                            className={
                                indexItem > 4 && !expand ? 'hidden' : 'block'
                            }
                        >
                            <ShoppingListItem
                                quantity={item.quantity}
                                name={item.name}
                                category={item.categoryName}
                                item_id={item.id}
                                editing={editing}
                                done={item.done}
                                catIndex={catIndex}
                                itemIndex={indexItem}
                            />
                        </motion.li>
                    )
                })}
                {category.items.length > 5 && (
                    <div className="flex justify-end pr-5">
                        <Button
                            modifier="primary"
                            onClick={() =>
                                setExpand((current: boolean) => !current)
                            }
                            className="w-full"
                        >
                            + {category.items.length - 5} items
                        </Button>
                    </div>
                )}
            </ul>
        </div>
    )
}

export default ShoppingListSingleCategory
