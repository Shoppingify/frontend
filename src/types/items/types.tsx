export interface ItemType {
    category_id: number
    categoryName: string
    created_at: string
    id: number
    image: string
    name: string
    note: string
    updated_at: string
    user_id: number
    quantity?: number
    done: boolean
}

export interface ListOfItems {
    category_id: number
    category: string
    items: ItemType[] | []
}
