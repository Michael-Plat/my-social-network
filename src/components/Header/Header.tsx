import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

const Header: FC<PropsType> = ({ isAuth, login, logout }) => {
  return (
    <header className={s.Header}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/f/f3/RKN_site_logo.png' />
      <div className={s.loginBlock}>
        {isAuth
          ? <div>{login} - <button onClick={logout} >Log out</button></div>
          : <NavLink to={'/Login '}>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header

export type PropsType = {
  isAuth: boolean
  login: string | null
  logout: () => void
}