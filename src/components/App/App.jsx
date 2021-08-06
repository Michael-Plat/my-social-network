import React, { lazy } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from '../common/Preloader/Preloader';
import HeaderConteiner from '../Header/HeaderConteiner';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import UsersConteiner from '../Users/UsersConteiner';
import { initializeApp } from '../../redax/appReducer';
import store from '../../redax/reduxStore';
import { withSuspense } from '../../hoc/withSuspense';

const ProfileConteiner = lazy(() => import('../Profile/ProfileConteiner'))
const DialogsContainer = lazy(() => import('../Dialogs/DialogsContainer'))
const News = lazy(() => import('../News/News')) 
const Misuc = lazy(() => import('../Music/Music'))
const Friends = lazy(() => import('../Friends/Friends'))
const Settings = lazy(() => import('../Settings/Settings'))

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
          <Switch>
            <Redirect exact from="/" to="/Profile" />
            <Route path='/Login' render={() => <Login />} />
            <Route path='/Profile/:userId?' render={withSuspense(ProfileConteiner)} />
            <Route path='/Dialogs' render={withSuspense(DialogsContainer)} />
            <Route path='/News' render={withSuspense(News)} />
            <Route path='/Music' render={withSuspense(Misuc)} />
            <Route path='/Users' render={() => <UsersConteiner pageTitle={'New acquaintances'} />} />
            <Route path='/Friends' render={withSuspense(Friends)} />
            <Route path='/Settings' render={withSuspense(Settings)} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
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