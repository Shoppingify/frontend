import React from 'react'

interface LoadingButtonProps {
    text: string
    type?: string
    loading?: boolean
    className?: string
}

const LoadingButton = ({
    text,
    type,
    loading,
    className,
    ...rest
}: LoadingButtonProps) => {
    return (
        <button
            {...rest}
            type="submit"
            disabled={loading}
            className={`relative w-full mt-2 mb-8 bg-primary text-white rounded py-3 px-4 hover:bg-opacity-75 transition-opacity duration-200`}
        >
            {loading && (
                <div
                    className="lds-dual-ring absolute"
                    style={{ left: '4px', top: '4px' }}
                ></div>
            )}
            {text}
        </button>
    )
}

export default LoadingButton
