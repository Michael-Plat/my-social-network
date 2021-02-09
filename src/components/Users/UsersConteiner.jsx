import React from 'react';
import { connect } from 'react-redux';
import { followAC, setUsersAC, unfollowAC } from '../../redax/usersReducer';
import Users from './Users';

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users)); 
        }
     }
}

const UsersConteiner = connect(mapStateToProps, mapDispatchToProps)(Users);
    
export default UsersConteiner;