import React, { Component } from 'react'
import { connect } from 'react-redux'
import { follow, unfollow, requestUsers } from '../../redax/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import { compose } from 'redux'
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redax/usersSelectors'
import { UsersType } from '../../types/types'
import { AppStateType } from '../../redax/reduxStore'

class UsersConteiner extends Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props
        this.props.getUsers(currentPage, pageSize)
    }
    onPageChanget = (pageNumber: number) => {
        const { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                currentPage={this.props.currentPage} users={this.props.users} unfollow={this.props.unfollow}
                follow={this.props.follow} onPageChanget={this.onPageChanget}
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
        followingInProgress: getFollowingInProgress(state)
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
}

type MapDispatchPropsType = {
    getUsers: (page: number, pageSize: number) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType