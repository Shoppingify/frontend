import React from 'react'
// Assets
import LogoSVG from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import SocialIcons from '../../components/button/SocialIcons'
import RegisterForm from '../../components/form/auth/RegisterForm'
/**
 * Simple login page component
 */

const Register = () => {
    return (
        <div className="container mx-auto">
            <div className="flex md:items-center justify-center min-h-screen w-full">
                <div
                    style={{ maxWidth: '475px' }}
                    className="flex flex-col md:border md:border-gray-light rounded-lg p-8 md:px-12"
                >
                    <div className="flex items-center  mb-6">
                        <LogoSVG />
                        <h1 className="ml-4 font-bold">Shoppingify</h1>
                    </div>
                    <p className="text-black font-bold text-xl mb-4">
                        Join thousands of learners from around the world
                    </p>
                    <p className="mb-8">
                        Master web development by making real-life projects.
                        There are multiple paths for you to choose
                    </p>
                    <RegisterForm />

                    <SocialIcons />

                    <p className="mt-4 text-center">
                        Already registered?{' '}
                        <Link
                            className="text-secondary hover:text-gray"
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
