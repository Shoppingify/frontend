import React, { useRef, useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { DebounceInput } from 'react-debounce-input'

interface SearchInputProps {
    search: (query: string) => void
}

const SearchInput = ({ search }: SearchInputProps) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        search(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            document.getElementById('searchInput')?.blur()
        }
    }

    return (
        <div className="mt-2 mx-auto xl:mx-0 xl:mt-0 xl:ml-2 flex items-center rounded-lg bg-white shadow-md h-12 px-4">
            <MdSearch className="text-xl mr-2" />
            <DebounceInput
                id="searchInput"
                minLength={1}
                debounceTimeout={300}
                className="w-full min-w-40"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default SearchInput
