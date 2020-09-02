import { hot } from "react-hot-loader/root"
import React, { useEffect } from "react"

// Libs
import { BrowserRouter as Router, Switch, useHistory } from "react-router-dom"
import { useRecoilState, atom } from "recoil/dist"

// Router components
import RoutesController from "./routes/RoutesController"

// Components
import Navbar from "./components/navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import LoggingLoader from "./components/loader/LoggingLoader"
import PublicRoute from "./components/route/PublicRoute"
import LoginPage from "./pages/login/LoginPage"
import { validateToken } from "./auth/validateToken"

// Recoil atom
export const userState = atom({
  key: "userState",
  default: {
    token: "",
    valid: false,
    loadingLogin: false,
  },
})

// TODO Refactor
/**
 * Main app component
 */
function App() {
  // Recoil user state
  const [user, setUser] = useRecoilState(userState)

  // Router
  const history = useHistory()

  /**
   * On mount effect
   */
  useEffect(() => {
    // TODO check token exp, if expired redirect to login
    const token = localStorage.getItem("token")

    async function checkToken() {
      const valid = await validateToken(token)

      // @ts-ignore
      setUser((current: object) => ({
        ...current,
        token,
        valid,
        loadingLogin: valid,
      }))

      console.log(valid)

      if (!valid) history.push("/login")

      if (valid) {
        // Fake login timeout
        setTimeout(() => {
          // @ts-ignore
          setUser((current: object) => ({
            ...current,
            loadingLogin: false,
          }))
        }, 2000)
      }
    }

    checkToken()
  }, [])

  if (user.loadingLogin) return <LoggingLoader />

  if (user.valid) {
    return (
      <div className="flex justify-between h-screen">
        {user.valid && <Navbar />}
        <div className="flex-grow">
          <RoutesController />
        </div>
        {user.valid && <Sidebar />}
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
