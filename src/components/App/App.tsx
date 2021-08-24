import React, { Component, ComponentType, FC, lazy } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import Preloader from '../common/Preloader/Preloader'
import HeaderConteiner from '../Header/HeaderConteiner'
import Navbar from '../Navbar/Navbar'
import { UsersPage } from '../Users/UsersConteiner'
import { initializeApp } from '../../redax/appReducer'
import store, { AppStateType } from '../../redax/reduxStore'
import { withSuspense } from '../../hoc/withSuspense'
import { Login } from '../Login/Login'

const ProfileConteiner = lazy(() => import('../Profile/ProfileConteiner'))
const DialogsContainer = lazy(() => import('../Dialogs/DialogsContainer'))
const News = lazy(() => import('../News/News'))
const Misuc = lazy(() => import('../Music/Music'))
const Friends = lazy(() => import('../Friends/Friends'))
const Settings = lazy(() => import('../Settings/Settings'))

const SuspendedProfile = withSuspense(ProfileConteiner)
const SuspendedDialogs = withSuspense(DialogsContainer)

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occured')
  }
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
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
            <Route path='/Profile/:userId?' render={() => <SuspendedProfile />} />
            <Route path='/Dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/News' render={withSuspense(News)} />
            <Route path='/Music' render={withSuspense(Misuc)} />
            <Route path='/Users' render={() => <UsersPage pageTitle={'New acquaintances'} />} />
            <Route path='/Friends' render={withSuspense(Friends)} />
            <Route path='/Settings' render={withSuspense(Settings)} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  sadeBar: state.sadeBar
})

const AppConteiner = compose<ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const MyCocialNetworkApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppConteiner />
      </Provider>
    </BrowserRouter>
  );
}

export default MyCocialNetworkApp;

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  initializeApp: () => void
}