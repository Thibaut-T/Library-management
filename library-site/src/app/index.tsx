import React from 'react';
import ReactDOM from 'react-dom';
import Home from './page';   
import { BrowserRouter } from 'react-router-dom';
import './globals.css';


ReactDOM.render(
    <BrowserRouter>
        <Home />
    </BrowserRouter>,
    document.getElementById('root')
)
