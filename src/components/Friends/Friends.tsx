import React, { FC } from 'react';
import PageNo from '../common/PageNo/PageNo';
import s from './Friends.module.css';

const Friends: FC<PropsType> = (props) => {
    return (
        <div className={s.nameFriend}>
            <PageNo />
        </div>
    )
}

export default Friends;

type PropsType = {}