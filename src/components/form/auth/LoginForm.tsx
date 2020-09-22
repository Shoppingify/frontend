import React, { useState } from 'react'

// Libs
import { Field, Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

// Components
import LoadingButton from '../../button/LoadingButton'
import AuthInput from '../../form-elements/AuthInput'
import { MdEmail, MdLock } from 'react-icons/md'

// Global state
import { useRecoilState } from 'recoil'
import { userState } from '../../../global-state/miscState'
import { userStateInterface } from '../../../types/state/userStateTypes'

import client from '../../../api/client'

// Validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().min(6).required('Required'),
})

// TODO cleanup into own components
/**
 * Login form component
 * @constructor
 */
const LoginForm = () => {
    const history = useHistory()
    const [user, setUser] = useRecoilState(userState)
    const [serverErrors, setServerErrors] = useState(null)

    /**
     * Handles login from passed data
     *
     * @param {string} email
     * @param {string} password
     */
    const handleLogin = async ({ email, password }: any) => {
        setServerErrors(null)
        try {
            const res = await client.post('login', {
                email,
                password,
            })

            console.log('user data', res.data)
            const { token, user } = res.data.data
            localStorage.setItem('token', token)
            setUser(() => user.id)
            history.push('/items')
        } catch (e) {
            console.log('error while login', e)
            if (e.response && e.response.data) {
                setServerErrors(e.response.data.message)
            } else {
                setServerErrors(e.message)
            }
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
        await handleLogin(data)
    }

    // TODO more cleanup
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
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
                    <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        text="Login"
                        className="mt-6"
                    />
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
