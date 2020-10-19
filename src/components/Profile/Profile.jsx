import React from 'react';
import MyPosts from './MyPosts/MyPosts.jsx';
import s from './Profile.module.css';
const Profile = () => {
  return (
    <div className={s.Content}>
      <div>
        <img src='https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg' />
      </div>
      <div>
        ava + description
        </div>
      <div>
        <MyPosts />
      </div>
    </div>
  );
}

export default Profile;
