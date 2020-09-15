import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './App'

// Styles
import 'react-toastify/dist/ReactToastify.min.css'
import './styles/styles.css'

// Fonts
require('typeface-quicksand')

// Libs
import { RecoilRoot } from 'recoil/dist'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const mountNode = document.getElementById('app')

ReactDOM.render(
    <Router>
        <RecoilRoot>
            <App />
            <ToastContainer position="top-left" />
        </RecoilRoot>
    </Router>,
    mountNode
)
