import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";

// Libs
import { BrowserRouter as Router } from 'react-router-dom';

// Router components
import RoutesController from "./routes/RoutesController";

// Components
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useRecoilState, atom } from "recoil/dist";

// Recoil atom
export const userState = atom({
  key: 'userState',
  default: {
    token: ''
  }
})

function App() {
  // Recoil user state
  const [user, setUser] = useRecoilState(userState);

  /**
   * On mount effect
   */
  useEffect(() => {
    if(localStorage.getItem('token')) {
      // @ts-ignore
      setUser((current: object) => (
        {
          ...current,
          token: localStorage.getItem('token')
        }
      ))
    }
  }, [])

  return (
    <Router>
      <div className="flex justify-between h-screen">
        { user.token && <Navbar /> }
        <div className="flex-grow">
          <RoutesController />
        </div>
        { user.token && <Sidebar /> }
      </div>
    </Router>
  );
}

export default hot(App);
