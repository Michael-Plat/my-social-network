import React, { FC } from 'react';
import { UsersType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    followingInProgress: Array<number>

    onPageChanget: () => void
    unfollow: () => void
    follow: () => void
}

const Users: FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanget, users, ...props }) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
            currentPage={currentPage} onPageChanget={onPageChanget} />
        <div>
            {
                users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow} follow={props.follow} />
                )
            }
        </div>
    </div>
}

export default Users;