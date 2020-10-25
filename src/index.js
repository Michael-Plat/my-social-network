import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let posts = [
  { id: 1, message: "Hi, how are you?", numberLike: 15 },
  { id: 2, message: 'It\' s my fist post', numberLike: 20 },
  { id: 3, message: 'Nothing is clear, but very interesting! )', numberLike: 34 },
  { id: 4, message: 'YO', numberLike: 5 },
  { id: 5, message: 'My fist post', numberLike: 2 }
]

let dialogs = [
  { id: 1, name: 'Dimych' },
  { id: 2, name: 'Andrey' },
  { id: 3, name: 'Sveta' },
  { id: 4, name: 'Sasha' },
  { id: 5, name: 'Viktor' },
  { id: 6, name: 'Valera' }
]

let messages = [
  { id: 1, message: "Hi" },
  { id: 2, message: "How is your it-kamksutra?" },
  { id: 3, message: "Yo" },
  { id: 4, message: "Yo" },
  { id: 5, message: "Yo 34" }
]

ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
