import React from 'react'

// Libs
import { Link, useLocation } from 'react-router-dom'

// Assets
import LogoSVG from '../../assets/logo.svg'

// Components
import SocialIcons from '../../components/button/SocialIcons'
import LoginForm from '../../components/form/auth/LoginForm'
import RegisterForm from '../../components/form/auth/RegisterForm'

const AuthPage: React.FC = () => {
    const { pathname } = useLocation()
    const authPath = pathname.replace(/\//g, '')

    const texts: {
        [key: string]: {
            cta: { text: string; link: { text: string; href: string } }
        }
    } = {
        login: {
            cta: {
                text: 'Not registered yet? ',
                link: {
                    href: '/register',
                    text: 'Register',
                },
            },
        },
        register: {
            cta: {
                text: 'Already have an account? ',
                link: {
                    text: 'Login',
                    href: '/login',
                },
            },
        },
    }

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
                    {authPath === 'login' && <LoginForm />}
                    {authPath === 'register' && <RegisterForm />}

                    <SocialIcons />

                    <p className="mt-4 text-center">
                        {texts[authPath].cta.text}
                        <Link
                            className="text-secondary hover:text-gray"
                            to={texts[authPath].cta.link.href}
                        >
                            {texts[authPath].cta.link.text}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
