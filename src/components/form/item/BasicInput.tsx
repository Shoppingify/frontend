import React from 'react'
import { Field, ErrorMessage } from 'formik'

type InputProps = {
    label: string
    name: string
    placeholder: string
    as?: string
    [rest: string]: any
}

const BasicInput: React.FC<InputProps> = ({
    label,
    name,
    placeholder,
    as,
    ...rest
}: InputProps) => {
    return (
        <div className="flex flex-col mb-3">
            <label className="font-medium" htmlFor={name}>
                {label}
            </label>
            <Field
                className="p-3 rounded-lg border-2 border-gray-input"
                name={name}
                placeholder={placeholder}
                as={as}
                {...rest}
            />
            <ErrorMessage name={name}>
                {(msg) => (
                    <div className="text-danger text-sm font-bold">{msg}</div>
                )}
            </ErrorMessage>
        </div>
    )
}

export default BasicInput
