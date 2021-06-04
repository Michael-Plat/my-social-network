import React from 'react';
import { Redirect } from 'react-router';
import MyPostsContainer from './MyPosts/MyPostsContainer.jsx';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';

const Profile = (props) => {
  if (!props.isAuth) return <Redirect to='/Login' />;

  return (
    <div>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer store={props.store} />
    </div>
  );
}

export default Profile;
