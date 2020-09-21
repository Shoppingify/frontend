import React, { useRef, useEffect } from 'react'

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
        const titleHeaderRef = useRef(document.createElement('div'))

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([e]) =>
                    e.target.classList.toggle(
                        'border-opacity-25',
                        e.intersectionRatio < 1
                    ),
                { threshold: [1] }
            )

            observer.observe(titleHeaderRef.current)
        }, [])

        return (
            <div
                className="flex justify-between mb-8 pr-2 sticky bg-primary-light pt-4 z-30 border-b-2 border-gray border-opacity-0"
                style={{
                    top: '-3rem',
                }}
                ref={titleHeaderRef}
            >
                <div className="w-7/8">
                    <Heading
                        level={2}
                        className={`font-bold rounded-lg break-all w-full ${
                            editing ? 'bg-white shadow-lg' : ''
                        }`}
                    >
                        <ContentEditable
                            disabled={!editing}
                            style={{ height: 'fit-content' }}
                            html={shopListName}
                            onChange={setShopListName}
                            className="p-2"
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
