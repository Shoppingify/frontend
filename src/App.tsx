import { hot } from 'react-hot-loader/root'
import React, { useCallback, useEffect, useState } from 'react'

// Libs
import { Switch, useHistory, useLocation, Redirect } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { isMobile } from 'react-device-detect'
import { Swipeable } from 'react-swipeable'

// Router components
import PrivateRoutesController from './routes/PrivateRoutesController'

// Components
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import PublicRoute from './components/route/PublicRoute'
import AuthPage from './pages/auth/AuthPage'

// State
import { userState } from './global-state/miscState'

// Api
import client from './api/client'

// Hooks
import useLoadActiveListData from './hooks/useLoadActiveListData'
import useFetchCategories from './hooks/useFetchCategories'
import BasicLoader from './components/loader/BasicLoader'
import useFetchItems from './hooks/useFetchItems'
import { sidebarMobileShowState } from './global-state/sidebarState'

/**
 * Main app component
 */
const App: React.FC = () => {
    // Recoil user state
    const [user, setUser] = useRecoilState(userState)
    const [init, setInit] = useState(true)
    const [sidebarShow, setSidebarShow] = useRecoilState(sidebarMobileShowState)

    // Router
    const history = useHistory()
    const location = useLocation()

    // Hooks
    const initialActiveShopListData = useLoadActiveListData()
    const fetchCategories = useFetchCategories()
    const fetchItems = useFetchItems()

    useEffect(() => {
        if (location.search.length > 0) {
            const access_token = new URLSearchParams(location.search).get(
                'access_token'
            )
            if (access_token) {
                // Connect the user
                localStorage.setItem('token', access_token)
                getConnectedUser()
            }
        }
    }, [location.search])

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

        console.log('Is app mobile?')
        console.log(isMobile)
    }, [])

    const initData = async () => {
        fetchCategories()
        fetchItems()
        initialActiveShopListData()
    }

    useEffect(() => {
        if (user !== null) {
            initData()
            setInit(false)
        }
    }, [user])

    const getConnectedUser = useCallback(async () => {
        try {
            const res = await client.get('me')
            const { id } = res.data.data
            setUser(id)
        } catch (e) {
            console.log('Error fetching the connected user', e)
            setInit(false)
            history.push('/login')
        }
    }, [])

    if (init)
        return (
            <div className="h-screen">
                <BasicLoader />
            </div>
        )

    if (user) {
        return (
            <Swipeable
                onSwiped={(eventData) => {
                    if (eventData.dir === 'Left') {
                        setSidebarShow(true)
                    } else if (eventData.dir === 'Right') {
                        setSidebarShow(false)
                    }
                }}
            >
                <div className="flex justify-between h-screen w-full overflow-hidden relative">
                    <Navbar />
                    <div className="flex-grow bg-gray-extra-light">
                        <PrivateRoutesController />
                    </div>
                    <Sidebar />
                </div>
            </Swipeable>
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
