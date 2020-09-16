import React from 'react'

// Global state
import { useRecoilValue } from 'recoil'
import { shopListState } from '../../../global-state/shopListState'

// Components
import Heading from '../../heading/Heading'
import ShoppingListItem from '../shopping-list__item/ShoppingListItem'

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
        </>
    )
}

export default RenderShopList
