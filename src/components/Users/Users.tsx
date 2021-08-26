import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FilterType, requestUsers } from '../../redax/usersReducer'
import {
    getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount,
    getUsers, getUsersFilter
} from '../../redax/usersSelectors'
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
    const history = useHistory()

    useEffect(() => {
        const queryString = require('querystring')

        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term }

        switch (parsed.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        const queryString = require('querystring')

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

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

type QueryParamsType = {
    page?: string
    term?: string
    friend?: string
}
