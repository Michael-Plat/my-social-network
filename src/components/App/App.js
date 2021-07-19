import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from '../common/Preloader/Preloader';
import DialogsContainer from '../Dialogs/DialogsContainer';
import Friends from '../Friends/Friends';
import HeaderConteiner from '../Header/HeaderConteiner';
import Login from '../Login/Login';
import Misuc from '../Music/Music.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import News from '../News/News.jsx';
import ProfileConteiner from '../Profile/ProfileConteiner';
import Settings from '../Settings/Settings';
import UsersConteiner from '../Users/UsersConteiner';
import { initializeApp } from '../../redax/appReducer';
import store from '../../redax/reduxStore';


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

const AppConteiner = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const MyCocialNetworkApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppConteiner />
      </Provider>
    </BrowserRouter>
  );
}

export default MyCocialNetworkApp;