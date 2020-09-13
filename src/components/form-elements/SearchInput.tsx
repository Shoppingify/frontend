import React from 'react'
import { MdSearch } from 'react-icons/md'

const SearchInput = () => {
    return (
        <div className="mx-auto xl:mx-0 flex items-center rounded bg-white shadow-md h-12 px-4">
            <MdSearch className="text-xl mr-2" />
            <input
                className="w-full min-w-40"
                type="text"
                placeholder="Search..."
            />
        </div>
    )
}

export default SearchInput
