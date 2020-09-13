import React from 'react'
import { MdSearch } from 'react-icons/md'

interface SearchInputProps {
    search: (query: string) => void
}

const SearchInput = ({ search }: SearchInputProps) => {
    return (
        <div className="mt-2 mx-auto xl:mx-0 xl:mt-0 xl:ml-2 flex items-center rounded-lg bg-white shadow-md h-12 px-4">
            <MdSearch className="text-xl mr-2" />
            <input
                className="w-full min-w-40"
                type="text"
                placeholder="Search..."
                onChange={(e) => search(e.target.value)}
            />
        </div>
    )
}

export default SearchInput
