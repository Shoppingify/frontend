import React from 'react'

// Types TODO refactor into own folder/file
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    modifier: string
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
 * @param props
 *  Props for the button
 */
function Button(props: ButtonProps) {
    const { modifier, disabled } = props

    function buildClasses() {
        let defaultClasses = btnModifiers[modifier]
        defaultClasses += ' ' + props.className
        defaultClasses +=
            ' text-white font-bold rounded-lg py-2 px-4 hover:shadow-md transition-all duration-300'
        if (disabled) defaultClasses += ' opacity-50 cursor-not-allowed'

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
