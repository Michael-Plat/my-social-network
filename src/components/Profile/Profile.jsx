import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto} profile={props.profile} isOwner={props.isOwner}
        status={props.status} updateStatus={props.updateStatus} saveProfile={props.saveProfile} />
      <MyPostsContainer store={props.store} />
    </div>
  );
}

export default Profile;
