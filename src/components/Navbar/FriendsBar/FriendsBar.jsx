import React from 'react';
import s from './../Navbar.module.css'
const FriendsBar = (props) => {
    return (
        <div className={s.name}>
            {props.name} <img src={props.avatar}  />
        </div>
    );
}
export default FriendsBar;