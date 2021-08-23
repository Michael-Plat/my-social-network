import React, { FC } from 'react'
import { FilterType } from '../../redax/usersReducer'
import { UsersType } from '../../types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'

const Users: FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanget, users, ...props }) => {
    return <div>
        <UsersSearchForm onFilterChanget={props.onFilterChanget} />
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

export default Users

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    followingInProgress: Array<number>

    onPageChanget: (pageNumber: number) => void
    onFilterChanget: (filter: FilterType) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
}
