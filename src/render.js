import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { addPost } from './redax/state';
import { BrowserRouter } from 'react-router-dom';

export let rerenderEntireTree = (state) => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state} addPost={ addPost } />
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
    }