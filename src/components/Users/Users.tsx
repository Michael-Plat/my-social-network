import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterType, requestUsers } from '../../redax/usersReducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redax/usersSelectors'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'

export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanget = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanget = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))

    }

    const follow = (id: number) => {
        dispatch(follow(id))
    }
    const unfollow = (id: number) => {
        dispatch(unfollow(id))
    }

    return <div>
        <UsersSearchForm onFilterChanget={onFilterChanget} />
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
            currentPage={currentPage} onPageChanget={onPageChanget} />
        <div>
            {
                users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                    unfollow={unfollow} follow={follow} />
                )
            }
        </div>
    </div>
}

type PropsType = {}
