import React from 'react'

// Types TODO refactor into own folder/file
interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    modifier?: string
}

interface btnModifiersTypes {
    [key: string]: string
}

// Predefined classname per style
const btnModifiers: btnModifiersTypes = {
    primary: 'bg-primary',
    secondary: 'bg-secondary ',
    danger: 'bg-danger',
    white: 'bg-white',
}

/**
 * Renders a button element
 *
 */
const Button: React.FC<PropTypes> = (props) => {
    // Destructure props
    const { modifier = '', disabled } = props

    // Methods
    /**
     * Builds button classes
     */
    const buildClasses = () => {
        let defaultClasses = ''

        // Check for undefined
        if (btnModifiers[modifier]) defaultClasses = btnModifiers[modifier]
        if (props.className) defaultClasses += ' ' + props.className
        if (disabled) defaultClasses += ' opacity-50 cursor-not-allowed'

        // Default classes for every button
        defaultClasses +=
            ' text-white font-bold rounded-lg py-2 px-4 hover:shadow-md transition-all duration-300'

        return defaultClasses
    }

    return (
        // TODO fix
        // @ts-ignore
        <button
            data-testid="button-component"
            {...props}
            className={buildClasses()}
        >
            {props.children}
        </button>
    )
}

export default Button
