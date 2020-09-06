import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { shopListDataState } from '../../global-state/atoms'
import ShoppingListItem from './ShoppingListItem'
import client from '../../api/client'

const ShoppingList: React.FC = () => {
    const [shopList, setShopList] = useRecoilState(shopListDataState)
    const [activeId, setActiveId] = useState(-1)

    // On load get active list
    useEffect(() => {
        async function initialData() {
            const response = await client.get('lists?status=active')
            const { data: listData } = await response.data

            const activeList = listData[0]
            const activeListId = activeList.id

            setActiveId(activeListId)

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

    // Runs when global shop list changes, send post to api
    useEffect(() => {
        if (activeId === -1) return

        async function updateList() {
            // Format data
            // First grab all items - only ids and quantity
            const items = shopList.map((category: any) => {
                return category.items.map((item: any) => {
                    return {
                        id: item.id,
                        quantity: item.quantity,
                    }
                })
            })

            const dataToBeSent = {
                //@ts-ignore
                items: items.flat(),
            }
            console.log(dataToBeSent)

            const response = await client.post(
                `lists/${activeId}/items`,
                dataToBeSent
            )
            const data = await response.data

            console.log(data)
        }

        updateList()
    }, [shopList])

    return (
        <div>
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
