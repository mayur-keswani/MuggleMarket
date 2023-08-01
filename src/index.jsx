import React from 'react';
import App from './App';
import { createRoot } from "react-dom/client";
import {BrowserRouter} from 'react-router-dom'
import './index.css';

import UserContextProvider from './context/user-context';
import { ToastContainer } from 'react-toastify';
const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App />
    </UserContextProvider>
  </BrowserRouter>
);

// ReactDOM.render(rootApp,document.getElementById('root'));


