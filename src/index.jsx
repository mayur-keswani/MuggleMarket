import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import './index.css';

import UserContextProvider from './context/user-context';
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);

// ReactDOM.render(rootApp,document.getElementById('root'));


