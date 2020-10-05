import { motion } from 'framer-motion'
import React from 'react'

// Libs
import { MdCheck } from 'react-icons/md'

interface PropTypes {
    checked: boolean
    onChange: () => void
    className?: string
}

const iconVariants = {
    hide: {
        scale: 0,
    },
    show: {
        scale: 1,
    },
}

const Checkbox: React.FC<PropTypes> = ({ checked, onChange, className }) => {
    const inputProps = { checked, onChange }
    return (
        <div className={className + ' checkbox'}>
            <input
                type="checkbox"
                {...inputProps}
                className="opacity-0 absolute"
            />
            <div
                className="icon border-primary rounded-md border-2 flex items-center justify-center"
                style={{ width: 24, height: 24 }}
            >
                <motion.div
                    variants={iconVariants}
                    initial="hide"
                    animate={checked ? 'show' : 'hide'}
                >
                    <MdCheck size={16} color="#F9A109" />
                </motion.div>
            </div>
        </div>
    )
}

export default React.memo(Checkbox)
