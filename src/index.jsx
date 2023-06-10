import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

import './index.css';
import UserContextProvider from './context/user-context';

const rootApp = (
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);

ReactDOM.render(rootApp,document.getElementById('root'));


