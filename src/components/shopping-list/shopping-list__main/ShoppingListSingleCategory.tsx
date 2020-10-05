import React, { useState } from 'react'

// Libs
import { motion } from 'framer-motion'

// Components
import CategoryHeading from '../../heading/CategoryHeading'
import ShoppingListItem from '../shopping-list__item/ShoppingListItem'
import Button from '../../button/Button'
import { useInView } from 'react-intersection-observer'

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
    const [ref, inView] = useInView({
        triggerOnce: true,
    })

    return (
        <div style={{ minHeight: '100px' }} className="mb-12">
            <CategoryHeading
                level={3}
                className="text-gray-light mb-6"
                category_id={category.category_id}
            />

            <ul ref={ref}>
                {category.items.map((item: any, indexItem: number) => {
                    return inView ? (
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
                                catIndex={catIndex}
                                itemIndex={indexItem}
                            />
                        </motion.li>
                    ) : null
                })}
            </ul>
        </div>
    )
}

export default ShoppingListSingleCategory
