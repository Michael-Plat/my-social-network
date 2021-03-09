import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News.jsx';
import Misuc from "./components/Music/Music.jsx";
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import Friends from './components/Friends/Friends';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersConteiner from './components/Users/UsersConteiner';
import ProfileConteiner from './components/Profile/ProfileConteiner';
import HeaderConteiner from './components/Header/HeaderConteiner';


const App = (props) => {
  return (
    <div className='app-wrapper'>
      <HeaderConteiner />
      <Navbar state={props.state.sadeBar} />
       <div className='app-wrapper-content'> 
         <Route path='/Profile/:userId?' render={ () => <ProfileConteiner store={props.store} />} /> 
         <Route path='/Dialogs' render={ () => <DialogsContainer store={props.store} />} />
         <Route path='/News' render={ () => <News />} />
         <Route path='/Music' render={ () => <Misuc />} />
         <Route path='/Users' render={ () => <UsersConteiner />} />
         <Route path='/Settings' render={ () => <Settings />} />
         <Route path='/Friends' render={ () => <Friends  /> } /> 
      </div>
    </div>
  );
}

export default App;
