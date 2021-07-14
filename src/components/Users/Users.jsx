
import React from 'react';
import Paginator from '../common/Paginator/Paginator.jsx';
import User from './User';



const Users = ({ totalUsersCount, pageSize, currentPage, onPageChanget, ...props }) => {
    return <div>
        <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
            currentPage={currentPage} onPageChanget={onPageChanget} />
        <div>
            {
                props.users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow} follow={props.follow} />
                )
            }
        </div>
    </div>
}

export default Users;