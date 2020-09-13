import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'

// Libs
import { Switch, useHistory } from 'react-router-dom'
import { useRecoilState, atom } from 'recoil/dist'

// Router components
import RoutesController from './routes/RoutesController'

// Components
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import LoggingLoader from './components/loader/LoggingLoader'
import PublicRoute from './components/route/PublicRoute'
import LoginPage from './pages/login/LoginPage'

// Helpers
import { validateToken } from './auth/validateToken'

// State
import { userState } from './global-state/miscState'
import { userStateInterface } from './types/state/userStateTypes'

/**
 * Main app component
 */
const App: React.FC = () => {
    // Recoil user state
    const [user, setUser] = useRecoilState(userState)

    // Router
    const history = useHistory()

    /**
     * On mount effect
     */
    useEffect(() => {
        // TODO check token exp, if expired redirect to login
        const token: string = localStorage.getItem('token') || ''

        async function checkToken() {
            const valid: boolean = await validateToken(token)

            setUser((current: userStateInterface) => ({
                ...current,
                token,
                valid,
                loadingLogin: valid,
            }))

            if (!valid) history.push('/login')

            if (valid) {
                // Fake login timeout
                setTimeout(() => {
                    // @ts-ignore
                    setUser((current: userStateInterface) => ({
                        ...current,
                        loadingLogin: false,
                    }))
                }, 100)
            }
        }

        checkToken()
    }, [])

    if (user.loadingLogin) return <LoggingLoader />

    if (user.valid) {
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
            <PublicRoute component={LoginPage} path="/login" />
        </Switch>
    )
}

export default hot(App)
