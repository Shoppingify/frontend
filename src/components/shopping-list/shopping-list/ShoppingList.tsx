import React, { useEffect, useState } from 'react'

// Api client
import client from '../../../api/client'

// Libs
import { MdCreate, MdSave } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'

// state
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
    sidebarState,
    ADD_NEW_ITEM,
    appConfigState,
} from '../../../global-state/sidebarState'
import { shopListDataState } from '../../../global-state/shopListState'

// Components
import ShoppingListItem from '../shopping-list__item/ShoppingListItem'
import Button from '../../button/Button'

/**
 * Main shopping list component
 */
const ShoppingList: React.FC = () => {
    // Global state
    const [shopList, setShopList] = useRecoilState(shopListDataState)
    const setSidebarType = useSetRecoilState(sidebarState)
    const [appConfig, setAppConfig] = useRecoilState(appConfigState)

    // Local state
    const [mounted, setMounted] = useState(false)
    const [editing, setEditing] = useState(false)

    // For shopping list title edit
    const [shopListName, setShopListName] = useState<string>('')

    /**
     * Component mounted effect
     */
    useEffect(() => {
        setMounted(true)
        async function initialData() {
            const response = await client.get('lists?status=active')
            const { data: listData } = await response.data

            const activeList = listData[0]
            const activeListId = activeList.id

            // Set global active list id
            setAppConfig((current: any) => ({ ...current, activeListId }))
            // Set local state for shopping list name
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
     * Editing change
     */
    useEffect(() => {
        if (!mounted) return

        if (!editing) {
            // Save list data
            // TODO need to store url in variable
            // TODO store old name in reference, perhaps use useRef?
            client.put(`lists/${appConfig.activeListId}`, {
                name: shopListName,
                status: 'active',
            })
        }
    }, [editing])

    return (
        <div className="h-full">
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
                    {editing ? <MdSave size={24} /> : <MdCreate size={24} />}
                </button>
            </div>
            {shopList.map((category: any, index: number) => (
                <div key={index} className="mb-16">
                    <h3 className="text-gray-light text-sm mb-6">
                        {category.category}
                    </h3>
                    {category.items.map((item: any, indexItem: number) => {
                        return (
                            <ShoppingListItem
                                key={`${item.name}__${indexItem}`}
                                quantity={item.quantity}
                                name={item.name}
                                category={item.categoryName}
                                item_id={item.id}
                                editing={editing}
                                done={item.done}
                                catIndex={index}
                                itemIndex={indexItem}
                            />
                        )
                    })}
                </div>
            ))}
            {!editing && (
                <div className="fixed bottom-0 h-40 w-1/3 right-0 bg-white flex justify-center items-center">
                    <Button modifier="danger" className="mr-3">
                        Cancel
                    </Button>
                    <Button modifier="secondary">Complete</Button>
                </div>
            )}
        </div>
    )
}

export default ShoppingList
