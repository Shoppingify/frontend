import React, { useRef, useEffect, useState } from 'react'

// Libs
import { MdCreate, MdClose } from 'react-icons/md'
import ContentEditable from '../../content/ContentEditable'
import Heading from '../../heading/Heading'

// Types
type PropTypes = {
    editing: boolean
    shopListName: string
    setShopListName: (e: any) => void
    setEditing: () => void
}

const ShoppingListTitle: React.FC<PropTypes> = React.memo(
    ({ editing, shopListName, setShopListName, setEditing }) => {
        // Ref for heading container
        const headingRef = useRef(document.createElement('div'))

        // Local state
        const [headingHeight, setHeadingHeight] = useState(0)

        /**
         * Effect runs on shopping list name change and if editing
         * Updates the headingHeight state
         */
        useEffect(() => {
            if (headingRef.current === null) return
            setHeadingHeight(headingRef.current.getBoundingClientRect().height)
        }, [shopListName, editing])

        return (
            <div
                className="flex justify-between mb-8 pr-2 sticky bg-primary-light pt-4 z-30"
                style={{
                    top: '-3rem',
                }}
            >
                <div className="w-7/8" ref={headingRef}>
                    <Heading
                        level={2}
                        className={`font-bold rounded-lg p-2  ${
                            editing ? 'bg-white shadow-lg' : ''
                        }`}
                    >
                        <ContentEditable
                            disabled={!editing}
                            style={{ height: 'fit-content' }}
                            html={shopListName}
                            onChange={setShopListName}
                        />
                    </Heading>
                </div>
                <button
                    onClick={setEditing}
                    className="w-1/8 flex justify-center pt-2"
                >
                    {editing ? <MdClose size={24} /> : <MdCreate size={24} />}
                </button>
            </div>
        )
    }
)

export default ShoppingListTitle
