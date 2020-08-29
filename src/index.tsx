import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles/styles.css";
import "./styles/styles.scss";
import { RecoilRoot } from "recoil/dist";

const mountNode = document.getElementById("app");
const appComponent = (
  <RecoilRoot>

  </RecoilRoot>
)
ReactDOM.render(<RecoilRoot>
  <App />
</RecoilRoot>, mountNode);
