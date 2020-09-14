import { hot } from 'react-hot-loader/root'
import React, { useCallback, useEffect, useState } from 'react'

// Libs
import { Switch, useHistory, Redirect } from 'react-router-dom'
import { useRecoilState, atom } from 'recoil/dist'

// Router components
import RoutesController from './routes/RoutesController'

// Components
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import LoggingLoader from './components/loader/LoggingLoader'
import PublicRoute from './components/route/PublicRoute'
import AuthPage from './pages/auth/AuthPage'

// Helpers
import { validateToken } from './auth/validateToken'

// State
import { userState } from './global-state/miscState'
import { userStateInterface } from './types/state/userStateTypes'
import client from './api/client'

/**
 * Main app component
 */
const App: React.FC = () => {
    // Recoil user state
    const [user, setUser] = useRecoilState(userState)
    const [init, setInit] = useState(true)

    // Router
    const history = useHistory()

    useEffect(() => {
        console.log('User', user)
    }, [user])

    const getConnectedUser = useCallback(async () => {
        try {
            const res = await client.get('me')
            const { id } = res.data.data
            console.log('res', res.data)
            setUser(id)
            setInit(false)
            // history.
        } catch (e) {
            console.log('Error fetching the connected user', e)
            setInit(false)
            history.push('/login')
        }
    }, [])

    useEffect(() => {
        //Check if we have a token
        if (localStorage.getItem('token')) {
            // Fetch the user
            getConnectedUser()
        } else {
            setInit(false)
        }
    }, [])

    if (init) return <LoggingLoader />

    if (user) {
        return (
            <div className="flex justify-between h-screen">
                <Navbar />
                <div className="flex-grow bg-gray-extra-light">
                    <RoutesController />
                </div>
                <Sidebar />
            </div>
        )
    }

    return (
        <Switch>
            <PublicRoute component={AuthPage} path="/login" />
            <PublicRoute component={AuthPage} path="/register" />
            <Redirect to="/login" />
        </Switch>
    )
}

export default hot(App)
