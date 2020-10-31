import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';
import News from './components/News/News.jsx';
import Misuc from "./components/Music/Music.jsx";
import Settings from './components/Settings/Settings';
import {Route} from 'react-router-dom';
import Friends from './components/Friends/Friends';




const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar state={props.state.sadeBar} />
       <div className='app-wrapper-content'> 
         <Route path='/Profile' render={ () => <Profile profilePage={props.state.profilePage} 
          addPost={props.addPost} updateNewPostText={props.updateNewPostText} />} /> 
         <Route path='/Dialogs' render={ () => <Dialogs state={props.state.dialogsPage}
         addMessage={props.addMessage} updateNewMessageText={props.updateNewMessageText}
         newMessageText={props.state.dialogsPage.newMessageText} />} />
         <Route path='/News' render={ () => <News />} />
         <Route path='/Music' render={ () => <Misuc />} />
         <Route path='/Settings' render={ () => <Settings />} />
         <Route path='/Friends' render={ () => <Friends  /> } /> 
      </div>
    </div>
  );
}

export default App;
