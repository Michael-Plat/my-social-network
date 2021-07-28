import React from 'react';
import { NavLink } from 'react-router-dom';
import FriendsBar from './FriendsBar/FriendsBar';
import s from './Navbar.module.css';

const Navbar = (props) => {

  let friendAvatar = props.sadeBar.friendsAvatars.map(av => <FriendsBar avatar={av.avatar} key={av.id} />);

  let nameFriend = props.sadeBar.nameFriends.map(n => <FriendsBar name={n.friend} key={n.id} />);
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
        <NavLink to='/Users' activeClassName={s.activeLink}>Find Users</NavLink>
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
