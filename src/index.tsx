import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'

// Styles
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/styles.css'

// Fonts
require('typeface-quicksand')

// Libs
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const mountNode = document.getElementById('app')

ReactDOM.render(
    <Router>
        <RecoilRoot>
            <App />
            <ToastContainer autoClose={1500} position="top-left" limit={3} />
        </RecoilRoot>
    </Router>,
    mountNode
)
