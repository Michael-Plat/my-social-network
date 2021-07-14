import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, requestUsers } from '../../redax/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers  } from '../../redax/usersSelectors';

class UsersConteiner extends React.Component {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }
    onPageChanget = (pageNumber) => { 
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                currentPage={this.props.currentPage} users={this.props.users} unfollow={this.props.unfollow}
                follow={this.props.follow} onPageChanget={this.onPageChanget} 
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state), 
        currentPage: getCurrentPage(state), 
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose (
    connect(mapStateToProps,{ follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers: requestUsers })
)(UsersConteiner)

