import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeIn, fadeInRight } from '../../animation/variants/move-in/fade-in'

interface CategoryModalProps {
    isVisible: boolean
    data: any[]
    onSelected: Function
    onClose?: (
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
    ) => void
}

const InputModal = ({ autocomplete, onTrigger }: any) => {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [])
    return (
        <input
            id="modalInput"
            ref={inputRef}
            className="p-3 rounded-lg border-2 border-gray-input w-full"
            type="text"
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
                autocomplete(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onTrigger({ name: value })
                }
            }}
        />
    )
}

const CategoryModal = ({
    isVisible,
    data,
    onClose,
    onSelected,
}: CategoryModalProps) => {
    const [filtered, setFiltered] = useState(data)

    const autocomplete = (value: string) => {
        console.log('value', value)
        const categoriesFiltered = data.filter((cat: any) =>
            cat.name.toLowerCase().includes(value.toLowerCase())
        )
        setFiltered(() => categoriesFiltered)
    }

    const onTrigger = (cat: any) => {
        onSelected(cat)
    }

    return !isVisible ? null : (
        <motion.div
            variants={fadeIn}
            animate="show"
            initial="hidden"
            className="fixed z-50 inset-0 overflow-y-auto"
            onClick={onClose}
        >
            <motion.div
                variants={fadeInRight}
                animate="show"
                initial="hidden"
                className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            >
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray opacity-50"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute text-3xl right-0 top-0 cursor-pointer hover:text-primary pr-4 transition-colors duration-200"
                    >
                        &times;
                    </button>

                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left pt-4">
                                <InputModal
                                    onTrigger={onTrigger}
                                    autocomplete={autocomplete}
                                />
                                {filtered.length > 0 && (
                                    <ul
                                        style={{ maxHeight: '200px' }}
                                        className="overflow-y-auto"
                                    >
                                        {filtered.map((cat: any) => {
                                            return (
                                                <li
                                                    key={cat.id}
                                                    className="focus:bg-gray-medium-light hover:bg-gray-medium-light my-2 cursor-pointer rounded-lg p-2"
                                                    tabIndex={0}
                                                    onClick={(e) =>
                                                        onTrigger(cat)
                                                    }
                                                    onKeyDown={(e) =>
                                                        onTrigger(cat)
                                                    }
                                                >
                                                    {cat.name}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CategoryModal
