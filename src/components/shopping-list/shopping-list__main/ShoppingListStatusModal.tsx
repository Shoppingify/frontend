import React from 'react'

// Components
import Button from '../../button/Button'
import { motion } from 'framer-motion'

// Types
type PropTypes = {
    handleListStatus: (status: string) => void
}

/**
 * Component that displays modal at the bottom of the shopping list
 */
const ShoppingListStatusModal: React.FC<PropTypes> = React.memo(
    ({ handleListStatus }) => {
        return (
            <div className="bg-white h-24 flex justify-center items-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Button
                        modifier="danger"
                        className="mr-3"
                        onClick={() => handleListStatus('canceled')}
                    >
                        Cancel
                    </Button>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Button
                        modifier="secondary"
                        onClick={() => handleListStatus('completed')}
                    >
                        Complete
                    </Button>
                </motion.div>
            </div>
        )
    }
)

export default ShoppingListStatusModal
