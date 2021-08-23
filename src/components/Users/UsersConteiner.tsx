import React, { Component } from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, requestUsers, FilterType } from '../../redax/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redax/usersSelectors'
import { UsersType } from '../../types/types'
import { AppStateType } from '../../redax/reduxStore'

class UsersConteiner extends Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize, filter } = this.props
        this.props.getUsers(currentPage, pageSize, filter)
    }
    onPageChanget = (pageNumber: number) => {
        const { pageSize, filter } = this.props
        this.props.getUsers(pageNumber, pageSize, filter)
    }

    onFilterChanget = (filter: FilterType) => {
        const { pageSize } = this.props
        this.props.getUsers(1, pageSize, filter)

    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                currentPage={this.props.currentPage} users={this.props.users} unfollow={this.props.unfollow}
                follow={this.props.follow} onPageChanget={this.onPageChanget} onFilterChanget={this.onFilterChanget}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, { follow, unfollow, getUsers: requestUsers }))
    (UsersConteiner)

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    getUsers: (page: number, pageSize: number, filter: FilterType) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType