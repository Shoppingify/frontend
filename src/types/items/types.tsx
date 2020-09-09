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
}

export interface CategoryType {
    id: number
    name: string
    user_id: number
    created_at: string
    updated_at: string
}

export interface ListOfItems {
    category: string
    items: ItemType[] | []
}
