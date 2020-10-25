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


const App = (props) => {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
      <Header />
      <Navbar />
       <div className='app-wrapper-content'> 
         <Route path='/Profile' render={ () => <Profile posts={props.posts} />} /> 
         <Route path='/Dialogs' render={ () => <Dialogs dialogs={props.dialogs} 
         messages={props.messages} />} />
         <Route path='/News' render={ () => <News />} />
         <Route path='/Music' render={ () => <Misuc />} />
         <Route path='/Settings' render={ () => <Settings />} />
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
