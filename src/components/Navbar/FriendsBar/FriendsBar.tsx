import React, { FC } from 'react';
import s from './../Navbar.module.css'

type PropsType = {
    name: string
    avatar: string
}

const FriendsBar: FC<PropsType> = ({ name, avatar }) => {
    return (
        <div>
            {name}
            <div>
                <img className={s.imgName} src={avatar} />
            </div>
        </div>
    );
}
export default FriendsBar;
