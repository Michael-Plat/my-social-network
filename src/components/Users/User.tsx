import React, { FC } from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { UsersType } from '../../types/types';

const User: FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id} >
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} alt='Avatar' />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>

                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>)
}

export default User;

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
}