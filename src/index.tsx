import * as React from 'react';
import * as ReactDOM from "react-dom";

import App from './App';
import "./styles.css";
import "./styles.scss";

const mountNode = document.getElementById("app");
ReactDOM.render(<App name="Shoppingify" />, mountNode);
