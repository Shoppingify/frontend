import React from 'react'

// Components
import LoginForm from '../../components/form/auth/LoginForm'

/**
 * Simple homepage component
 */
const Home: React.FC = () => {
    return (
        <div>
            <h1>Homepage</h1>
            <LoginForm />
        </div>
    )
}

export default Home
