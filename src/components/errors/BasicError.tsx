import React from 'react'

// Types
interface BasicErrorProps {
    message: string
    rest?: object
}

/**
 * Used to display error message
 */
const BasicError = ({ message, ...rest }: BasicErrorProps) => {
    return (
        <div className="flex h-full w-full items-center justify-center text-center">
            <div>
                <span
                    className="block text-xl text-danger font-bold mb-6"
                    {...rest}
                >
                    {message}
                </span>
            </div>
        </div>
    )
}

export default BasicError
