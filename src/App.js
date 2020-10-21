import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';
import News from './components/News/News.jsx';
import Misuc from "./components/Music/Music.jsx";
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
      <Header />
      <Navbar />
       <div className='app-wrapper-content'> 
         <Route path='/Profile' component={Profile} /> 
         <Route path='/Dialogs' component={Dialogs} />
         <Route path='/News' component={News} />
         <Route path='/Music' component={Misuc} />
         <Route path='/Settings' component={Settings} />
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
