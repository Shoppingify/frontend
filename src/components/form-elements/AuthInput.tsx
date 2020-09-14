import { ErrorMessage, Field } from 'formik'
import React from 'react'

interface AuthInputProps {
    type: string
    name: string
    icon: any
    placeholder: string
}

const AuthInput = ({
    type,
    name,
    icon,
    placeholder,
    ...rest
}: AuthInputProps) => {
    return (
        <div className="mb-4">
            <div className="flex items-center border px-2 py-1 border-gray-light rounded focus-within:border-secondary">
                {/* <img className="w-6 h-6" src={icon} /> */}
                {icon}

                <Field
                    style={{ minWidth: 0 }}
                    className="bg-transparent ml-2 w-full h-full p-2 text-black rounded outline-none"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    {...rest}
                />
            </div>
            <ErrorMessage name={name}>
                {(msg) => <p className="text-danger text-sm">{msg}</p>}
            </ErrorMessage>
        </div>
    )
}

export default AuthInput
