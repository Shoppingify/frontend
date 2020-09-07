import React from 'react'

// Libs
import { Field, Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'

// Components
import Button from '../../button/Button'
import * as Yup from 'yup'
import { useRecoilState } from 'recoil/dist'
import { userState } from '../../../App'

// Validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),
})

// TODO cleanup into own components
/**
 * Login form component
 * @constructor
 */
function LoginForm() {
    const history = useHistory()
    const [user, setUser] = useRecoilState(userState)

    /**
     * Handles login from passed data
     *
     * @param {string} email
     * @param {string} password
     */
    async function handleLogin({ email, password }: any) {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const {
            status,
            data: { token },
        } = await response.json()

        if (status === 'success') {
            localStorage.setItem('token', token)
            setUser((current) => ({
                ...current,
                token,
                valid: true,
            }))
            history.push('/items')
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
                    <div className="mb-5">
                        <Field
                            name="email"
                            type="input"
                            placeholder="Enter your email..."
                        />
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-5">
                        <Field
                            name="password"
                            type="password"
                            placeholder="Enter your password..."
                        />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                    </div>
                    <Button
                        text="Login"
                        type="submit"
                        modifier="primary"
                        disabled={isSubmitting}
                    />
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm
