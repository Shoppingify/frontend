import React from 'react'

// Libs
import { motion } from 'framer-motion'
import { zoomLevel } from 'zoom-level'

// Assets
import ShoppingAppSVG from '../../../assets/undraw_shopping_app_flsj.svg'

const RenderNoItems = React.memo(() => {
    return (
        <motion.div
            key="renderNoItems"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 100 }}
            className="w-full flex flex-wrap flex-grow items-center overflow-hidden relative pb-71"
        >
            <div className="w-full flex justify-center items-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    exit={{
                        opacity: 0,
                        transition: { delay: 0 },
                    }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-xl"
                >
                    No items
                </motion.p>
            </div>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="w-full absolute bottom-0"
            >
                <div
                    style={{
                        transform: zoomLevel() !== 2 ? 'scale(0.75)' : '',
                    }}
                >
                    <ShoppingAppSVG style={{ transform: 'scaleX(-1)' }} />
                </div>
            </motion.div>
        </motion.div>
    )
})

export default RenderNoItems
