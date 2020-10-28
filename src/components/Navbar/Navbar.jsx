import React from 'react';
import { NavLink } from 'react-router-dom';
import Friends from '../Friends/Friends';
import FriendsBar from './FriendsBar/FriendsBar';
import s from './Navbar.module.css';

const Navbar = (props) => {
  
  let nameFriend = props.state.nameFriends.map(n => <FriendsBar name={n.friend} />);
  let friendAvatar = props.state.friendsAvatars.map(av => <FriendsBar avatar={av.avatar} />);

  return (
    <nav className={s.Nav}>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to='/Profile' activeClassName={s.activeLink}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Dialogs' activeClassName={s.activeLink}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/News' activeClassName={s.activeLink}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Music' activeClassName={s.activeLink}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Settings' activeClassName={s.activeLink}>Settings</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/Friends' activeClassName={s.activeLink}>Friends</NavLink>
      </div>
      <div>
        {friendAvatar}
        {nameFriend}
      </div>
    </nav>
  );
}

export default Navbar;
