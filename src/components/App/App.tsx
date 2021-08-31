import React, { Component, ComponentType, FC, lazy } from 'react'
import { connect, Provider } from 'react-redux'
import { BrowserRouter, NavLink as Link, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import './App.css'
import Preloader from '../common/Preloader/Preloader'
import Navbar from '../Navbar/Navbar'
import { UsersPage } from '../Users/UsersConteiner'
import { initializeApp } from '../../redax/appReducer'
import store, { AppStateType } from '../../redax/reduxStore'
import { withSuspense } from '../../hoc/withSuspense'
import { Login } from '../Login/Login'
import { Layout, Menu, Breadcrumb, Typography, Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons';
import { AppHeader } from '../Header/Header'


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography

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
        <AppHeader />
        <Content style={{ padding: '0 50px', background: '#B6D6C8' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200} >
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: '100%', background: '#EFF1F5' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="1">< Link to='/Profile'>Profile</Link></Menu.Item>
                  <Menu.Item key="2"><Link to='/News'>My News</Link></Menu.Item>
                  <Menu.Item key="3"><Link to='/Dialogs'>Messages</Link></Menu.Item>
                  <Menu.Item key="4"><Link to='/Friends'>My contacts</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Find">
                  <Menu.Item key="5"><Link to='/Users'>Find contacts</Link></Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings">
                  <Menu.Item key="9"><Link to='/Settings'>Settings</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280, }}>
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
        <Footer style={{ textAlign: 'center', background: '#297052', color: '#B6D6C8' }}>
          My social Network ©2020 Created by Ivan Oblomov(Plat)
        </Footer>
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