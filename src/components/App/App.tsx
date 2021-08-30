import React, { Component, ComponentType, FC, lazy } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, NavLink, Redirect, Route, Switch, withRouter } from 'react-router-dom'
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
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

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

      <Layout>
        <Header className="header" style={{ background: '#7EAD99' }} >
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ background: '#AAD6C3' }}>
            <Menu.Item key="1" style={{ background: '#678276' }} >Login</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200} >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', background: '#AAD6C3' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="1"><NavLink to='/Profile'>Profile</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to='/News'>My News</NavLink></Menu.Item>
                  <Menu.Item key="3"><NavLink to='/Dialogs'>Messages</NavLink></Menu.Item>
                  <Menu.Item key="4"><NavLink to='/Friends'>My contacts</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Find">
                  <Menu.Item key="5"><NavLink to='/Users'>Find contacts</NavLink></Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
                  <Menu.Item key="9"><NavLink to='/Settings'>Settings</NavLink></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
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
            </Content>
          </Layout>
        </Content>
        <Footer style={{
          textAlign: 'center', background: '#297052'
        }}>My social Network ©2020 Created by Ivan Oblomov(Plat)</Footer>
      </Layout>
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