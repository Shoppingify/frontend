import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles/styles.css";
import "./styles/styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);
