import React from 'react'

// Types TODO refactor into own folder/file
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    modifier: string
    text: string
}

// Predefined classname per style
const btnTypes = {
    primary: 'py-2 px-4 mx-4 bg-primary text-white font-bold rounded-lg',
    secondary: 'py-2 px-4 mx-4 bg-secondary text-white font-bold rounded-lg',
}

/**
 * Renders a button element
 *
 * @param props
 *  Props for the button
 */
function Button(props: ButtonProps) {
    const { modifier, text, disabled } = props

    function buildClasses() {
        // TODO fix
        // @ts-ignore
        let defaultClasses = btnTypes[modifier]
        if (disabled) defaultClasses += ' opacity-50 cursor-not-allowed'

        return defaultClasses
    }

    return (
        // TODO fix
        // @ts-ignore
        <button {...props} className={buildClasses()}>
            {text}
        </button>
    )
}

export default Button
