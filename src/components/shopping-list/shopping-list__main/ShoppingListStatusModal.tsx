import React, { useState } from 'react'

// Components
import Button from '../../button/Button'
import { motion } from 'framer-motion'
import Modal from '../../modal/Modal'
import { fi } from 'date-fns/locale'

type PropTypes = {
    handleListStatus: (status: string) => void
}

const ShoppingListStatusModal: React.FC<PropTypes> = React.memo(
    ({ handleListStatus }) => {
        const [showModal, setShowModal] = useState<{
            type: string
            show: boolean
        }>({ type: '', show: false })

        /** Create different modal if we cancel or complete a list */
        const createModal = () => {
            if (showModal.type === '') return null

            const modalProps = {
                content:
                    showModal.type === 'cancel'
                        ? 'Are you sure that you want to cancel this list'
                        : 'Are you sure that you want mark that list as complete?',
                action: showModal.type === 'cancel' ? 'canceled' : 'completed',
            }

            return (
                <Modal
                    content={modalProps.content}
                    isVisible={showModal.show}
                    onDelete={() => handleListStatus(modalProps.action)}
                    onClose={() => setShowModal({ type: '', show: false })}
                />
            )
        }

        return (
            <div className="bg-white h-24 flex justify-center items-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Button
                        modifier="danger"
                        className="mr-3"
                        onClick={() =>
                            setShowModal({ type: 'cancel', show: true })
                        }
                    >
                        Cancel
                    </Button>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Button
                        modifier="secondary"
                        onClick={() =>
                            setShowModal({ type: 'complete', show: true })
                        }
                    >
                        Complete
                    </Button>
                </motion.div>

                {createModal()}
            </div>
        )
    }
)

export default ShoppingListStatusModal
