import React from 'react';
import s from './../Navbar.module.css'
const FriendsBar = (props) => {
    return (
        <div>
            {props.name}
            <div>
                <img className={s.imgName} src={props.avatar} />
            </div>
        </div>
    );
}
export default FriendsBar;