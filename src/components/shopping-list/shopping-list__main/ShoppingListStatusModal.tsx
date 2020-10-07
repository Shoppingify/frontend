import React, { useState } from 'react'

// Components
import Button from '../../button/Button'
import { motion } from 'framer-motion'
import Modal from '../../modal/Modal'
import { fi } from 'date-fns/locale'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, ModalType } from '../../../global-state/modalState'

type PropTypes = {
    handleListStatus: (status: string) => void
}

const ShoppingListStatusModal: React.FC<PropTypes> = React.memo(
    ({ handleListStatus }) => {
        const [modal, setModal] = useRecoilState(modalState)

        return (
            <div className="bg-white h-24 flex justify-center items-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Button
                        modifier="danger"
                        className="mr-3"
                        onClick={() => {
                            setModal(() => {
                                return {
                                    show: true,
                                    type: ModalType.Canceled,
                                }
                            })
                        }}
                    >
                        Cancel
                    </Button>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Button
                        modifier="secondary"
                        onClick={() => {
                            setModal(() => {
                                return {
                                    show: true,
                                    type: ModalType.Completed,
                                }
                            })
                        }}
                    >
                        Complete
                    </Button>
                </motion.div>

                <Modal
                    content={modal.type}
                    isVisible={modal.show}
                    onDelete={() => handleListStatus(modal.type)}
                    onClose={() =>
                        setModal(() => {
                            return {
                                show: false,
                                type: ModalType.Canceled,
                            }
                        })
                    }
                />
            </div>
        )
    }
)

export default ShoppingListStatusModal
