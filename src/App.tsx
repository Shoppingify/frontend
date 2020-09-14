import { hot } from 'react-hot-loader/root'
import React, { useCallback, useEffect, useState } from 'react'

// Libs
import {
    Switch,
    useHistory,
    useLocation,
    useParams,
    Redirect,
} from 'react-router-dom'
import { useRecoilState, atom } from 'recoil/dist'

// Router components
import RoutesController from './routes/RoutesController'

// Components
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import LoggingLoader from './components/loader/LoggingLoader'
import PublicRoute from './components/route/PublicRoute'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

// Helpers
import { validateToken } from './auth/validateToken'

// State
import { userState } from './global-state/miscState'
import { userStateInterface } from './types/state/userStateTypes'
import client from './api/client'
import AuthPage from './pages/auth/AuthPage'

/**
 * Main app component
 */
const App: React.FC = () => {
    // Recoil user state
    const [user, setUser] = useRecoilState(userState)
    const [init, setInit] = useState(true)

    // Router
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        // console.log('history location', location)
        console.log('location search', location.search)
        if (location.search.length > 0) {
            const access_token = new URLSearchParams(location.search).get(
                'access_token'
            )
            if (access_token) {
                // Connect the user
                console.log('access_token', access_token)
                localStorage.setItem('token', access_token)
                getConnectedUser()
            }
        }
    }, [location.search])

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
            if (location.search === '') {
                getConnectedUser()
            }
        } else {
            setInit(false)
            history.push('/login')
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
