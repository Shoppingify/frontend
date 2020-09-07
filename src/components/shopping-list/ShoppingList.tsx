import React, { useEffect, useState } from 'react'

// Api client
import client from '../../api/client'

// Libs
import { MdCreate } from 'react-icons/md'

// state
import { useRecoilState, useSetRecoilState } from 'recoil'
import { sidebarState, ADD_NEW_ITEM } from '../../global-state/atoms'
import { shopListDataState } from '../../global-state/shopListState'

// Components
import ShoppingListItem from './ShoppingListItem'

/**
 * Main shopping list component
 */
const ShoppingList: React.FC = () => {
    // Global state
    const [shopList, setShopList] = useRecoilState(shopListDataState)
    const setSidebarType = useSetRecoilState(sidebarState)

    // Local state
    const [activeId, setActiveId] = useState(-1)
    const [editing, setEditing] = useState(false)

    // For shopping list title edit
    const [shopListName, setShopListName] = useState<string>('')

    /**
     * Component mounted effect
     */
    useEffect(() => {
        async function initialData() {
            const response = await client.get('lists?status=active')
            const { data: listData } = await response.data

            const activeList = listData[0]
            const activeListId = activeList.id

            setActiveId(activeListId)
            setShopListName(activeList.name)

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

    /**
     * State of shopList changed effect
     */
    useEffect(() => {
        console.log('Current shopping list')
        console.log(shopList)
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
            <div onClick={() => setSidebarType(ADD_NEW_ITEM)}>
                Add a new item
            </div>
            <div className="flex justify-between mb-8 items-center">
                {editing ? (
                    <input
                        className="font-bold text-2xl"
                        type="text"
                        value={shopListName}
                        onChange={(e) => setShopListName(e.target.value)}
                    />
                ) : (
                    <h2 className="font-bold text-2xl">{shopListName}</h2>
                )}
                <button
                    onClick={() => setEditing((current: boolean) => !current)}
                >
                    <MdCreate size={24} />
                </button>
            </div>
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
                            editing={editing}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default ShoppingList
