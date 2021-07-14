import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './components/common/Preloader/Preloader';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Friends from './components/Friends/Friends';
import HeaderConteiner from './components/Header/HeaderConteiner';
import Login from './components/Login/Login';
import Misuc from './components/Music/Music.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import News from './components/News/News.jsx';
import ProfileConteiner from './components/Profile/ProfileConteiner';
import Settings from './components/Settings/Settings';
import UsersConteiner from './components/Users/UsersConteiner';
import { initializeApp } from './redax/appReducer';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper' >
        <HeaderConteiner />
        <Navbar {...this.props} />
        <div className='app-wrapper-content'>
          <Route path='/Login' render={() => <Login />} />
          <Route path='/Profile/:userId?' render={() => <ProfileConteiner {...this.props} />} />
          <Route path='/Dialogs' render={() => <DialogsContainer {...this.props} />} />
          <Route path='/News' render={() => <News />} />
          <Route path='/Music' render={() => <Misuc />} />
          <Route path='/Users' render={() => <UsersConteiner />} />
          <Route path='/Settings' render={() => <Settings />} />
          <Route path='/Friends' render={() => <Friends />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  sadeBar: state.sadeBar
})

export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
