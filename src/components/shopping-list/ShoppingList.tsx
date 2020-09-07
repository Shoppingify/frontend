import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
    shopListDataState,
    sidebarState,
    ADD_NEW_ITEM,
} from '../../global-state/atoms'
import ShoppingListItem from './ShoppingListItem'
import client from '../../api/client'

const ShoppingList: React.FC = () => {
    const [shopList, setShopList] = useRecoilState(shopListDataState)
    const [sidebarType, setSidebarType] = useRecoilState(sidebarState)

    useEffect(() => {
        // On load get active list
        async function initialData() {
            const response = await client.get('lists?status=active')
            const { data: listData } = await response.data

            const activeList = listData[0]
            const activeListId = activeList.id

            // Another request to fetch items
            const responseItems = await client.get(
                `lists/${activeListId}/items`
            )
            const {
                data: { items: itemsData },
            } = await responseItems.data

            setShopList(itemsData)
        }

        initialData()
    }, [])

    useEffect(() => {
        console.log('Current shopping list')
        console.log(shopList)
    }, [shopList])

    return (
        <div>
            <div onClick={() => setSidebarType(ADD_NEW_ITEM)}>
                Add a new item
            </div>
            <h2 className="font-bold text-2xl mb-8">Shopping list</h2>
            {shopList.map((category: any, index: number) => (
                <div key={index} className="mb-16">
                    <h3 className="text-gray-light text-sm mb-6">
                        {category.category}
                    </h3>
                    {category.items.map((item: any, indexItem: number) => (
                        <ShoppingListItem
                            key={indexItem}
                            quantity={item.quantity}
                            name={item.name}
                            category={item.categoryName}
                            id={item.id}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ShoppingList
