import React, { useState } from 'react'

// Libs
import { Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { MdEmail, MdLock } from 'react-icons/md'

// Global state
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '../../../global-state/miscState'

// Api client
import client from '../../../api/client'

// Components
import LoadingButton from '../../button/LoadingButton'
import AuthInput from '../../form-elements/AuthInput'

// Validation schema
const RegisterSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().min(6).required('Required'),
    password_confirmation: Yup.string().oneOf(
        [Yup.ref('password'), ''],
        'Password must match'
    ),
})

/**
 * Login form component
 * @constructor
 */
const RegisterForm = () => {
    const history = useHistory()
    const setUser = useSetRecoilState(userState)
    const [serverErrors, setServerErrors] = useState(null)

    /**
     * Handles login from passed data
     *
     * @param {string} email
     * @param {string} password
     */
    const handleRegister = async ({ email, password }: any) => {
        setServerErrors(null)
        try {
            const res = await client.post('register', {
                email,
                password,
            })
            const { token, user } = res.data.data

            localStorage.setItem('token', token)

            setUser(user.id)

            history.push('/items')
        } catch (e) {
            setServerErrors(
                e.response && e.response.data
                    ? e.response.data.message
                    : e.message
            )
        }
    }

    /**
     * Handles login form submit
     *
     * @param {object} data
     *  Data from the login form
     * @param {function} setSubmitting
     *  setSubmitting function
     */
    async function handleSubmit(data: any, { setSubmitting }: any) {
        setSubmitting(true)
        await handleRegister(data)
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                password_confirmation: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={RegisterSchema}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    {serverErrors && (
                        <div className="bg-danger text-white rounded mb-4 p-2">
                            {serverErrors}
                        </div>
                    )}
                    <AuthInput
                        icon={<MdEmail />}
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                    />
                    <AuthInput
                        icon={<MdLock />}
                        name="password"
                        type="password"
                        placeholder="Enter your password..."
                    />
                    <AuthInput
                        icon={<MdLock />}
                        name="password_confirmation"
                        type="password"
                        placeholder="Retype your password..."
                    />
                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        text="Register"
                        className="mt-6"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default RegisterForm
