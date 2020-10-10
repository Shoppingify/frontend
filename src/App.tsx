import { hot } from 'react-hot-loader/root'
import React, { useCallback, useEffect, useState } from 'react'

// Libs
import { Switch, useHistory, useLocation, Redirect } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Swipeable } from 'react-swipeable'

// Router components
import PrivateRoutesController from './routes/PrivateRoutesController'

// Components
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import PublicRoute from './components/route/PublicRoute'
import AuthPage from './pages/auth/AuthPage'
import BasicLoader from './components/loader/BasicLoader'

// State
import { userState } from './global-state/miscState'

// Api
import client from './api/client'

// Hooks
import useLoadActiveListData from './hooks/useLoadActiveListData'
import useFetchCategories from './hooks/useFetchCategories'
import useFetchItems from './hooks/useFetchItems'
import useLoadHistoryLists from './hooks/useFetchHistoryLists'
import useSidebarShow from './hooks/useSidebarShow'

/**
 * Main app component
 */
const App: React.FC = () => {
    // Recoil user state
    const [user, setUser] = useRecoilState(userState)
    const [init, setInit] = useState(true)
    const [lastHeight, setLastHeight] = useState(0)

    // Router
    const history = useHistory()
    const location = useLocation()

    // Hooks
    const initialActiveShopListData = useLoadActiveListData()
    const fetchCategories = useFetchCategories()
    const fetchItems = useFetchItems()
    const fetchShopListHistory = useLoadHistoryLists()
    const showSidebar = useSidebarShow()

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
    }, [])

    // css trick to avoid the 100 vh problem on mobile
    useEffect(() => {
        const resize = () => {
            // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
            let vh = window.innerHeight * 0.01
            // Then we set the value in the --vh custom property to the root of the document
            document.documentElement.style.setProperty('--vh', `${vh}px`)
        }

        resize()
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    const initData = async () => {
        await fetchCategories()
        await fetchItems()
        await initialActiveShopListData()
        await fetchShopListHistory()
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
                    if (eventData.dir === 'Left' || eventData.dir === 'Right') {
                        showSidebar(eventData.dir)
                    }
                }}
            >
                <div className="flex justify-between custom100vh w-full overflow-hidden relative">
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
