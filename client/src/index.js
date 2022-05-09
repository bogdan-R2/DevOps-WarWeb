import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
//import { IconName } from "react-icons/fc";
import { BrowserRouter as Router } from "react-router-dom";
import './bootstrap.min.css'

const root = createRoot(document.getElementById('root'));

root.render(
      <App />
    //document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
