import { motion } from 'framer-motion'
import React from 'react'
import { fadeIn, fadeInRight } from '../../animation/variants/move-in/fade-in'
import { ModalType } from '../../global-state/modalState'
import Button from '../button/Button'

interface ModalProps {
    isVisible: boolean
    content: ModalType
    onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    onClose?: (
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
    ) => void
}

const types = {
    canceled: {
        message: 'Are you sure that you want to cancel this list?',
    },
    completed: {
        message: 'Are you sure that you want mark that list as complete?',
    },
    deleted: {
        message: 'Are you sure that you want to delete this item?',
    },
}

const Modal = ({ isVisible, content, onDelete, onClose }: ModalProps) => {
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
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg
                                    className="h-6 w-6 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div className="mt-2">
                                    <p className="text-sm leading-5 text-gray-500">
                                        {types[content].message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                            <Button onClick={onDelete} modifier="danger">
                                Yes
                            </Button>
                        </span>
                        <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                            <Button
                                modifier=""
                                className="text-black"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Modal
