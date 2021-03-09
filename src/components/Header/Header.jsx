import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
  return (
    <header className={s.Header}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/f/f3/RKN_site_logo.png' />
      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={'/Login '}>Login</NavLink>}
      </div>
    </header>
  );
}

export default Header;
