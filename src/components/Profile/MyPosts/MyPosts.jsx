import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
const MyPosts = () => {
  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        <Post message="Hi, how are you?" numberLike='15' />
        <Post message="It' s my fist post" numberLike='20' />
        <Post message="Nothing is clear, but very interesting! )" numberLike='34' />
      </div>
    </div>
  );
}

export default MyPosts;
