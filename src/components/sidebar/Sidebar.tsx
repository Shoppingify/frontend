import React from 'react'

// Libs
import ShoppingList from '../shopping-list/ShoppingList'

// TODO Refactor list into own component
/**
 * Sidebar of the app, displays shopping list
 */
function Sidebar() {
    return (
        <div className="w-1/3 bg-primary-light p-12">
            <ShoppingList />
        </div>
    )
}

export default Sidebar
