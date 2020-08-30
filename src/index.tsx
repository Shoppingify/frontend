import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles/styles.css";
import "./styles/styles.scss";
import { RecoilRoot } from "recoil/dist";
import {BrowserRouter as Router} from "react-router-dom";

const mountNode = document.getElementById("app");

ReactDOM.render(
  <Router>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Router>,
  mountNode
);
