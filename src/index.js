import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

import './index.css';

const rootApp =(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)

ReactDOM.render(rootApp,document.getElementById('root'));


