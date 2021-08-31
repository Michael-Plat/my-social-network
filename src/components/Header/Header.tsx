import { Button, Col, Menu, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';
import React, { FC } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redax/authSelectors';
import { logout } from '../../redax/authReducer'

export const AppHeader: FC = (props) => {

  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectCurrentUserLogin)

  const dispatch = useDispatch()

  const logoutCallback = () => {
    dispatch(logout())
  }

  return (
    <Header className="header" style={{ background: '#7EAD99' }}  >
      <div className="logo" />
      <Row>
        <Col span={4}>
          <Menu theme="dark" mode="horizontal" style={{ background: '#7EAD99', }}>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Login">
              <Menu.Item key="1" style={{ background: '#678276', color: 'white' }} >
                {isAuth
                  ? <div>{login}<Button style={{ marginLeft: '15px' }} onClick={logoutCallback}>Log out</Button></div>
                  : <Button style={{ marginLeft: '30px' }}><Link to={'/Login'}>Login</Link></Button>
                }
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={20}>
          <Title style={{ color: '#003a8c', textAlign: 'right', margin: '7px 20px' }} level={2}>My Social Nework</Title>
        </Col>
      </Row>
    </Header>
  );
}

export type PropsType = {
  isAuth: boolean
  login: string | null
  logout: () => void
}