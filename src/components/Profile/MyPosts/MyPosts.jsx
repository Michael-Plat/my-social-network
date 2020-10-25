import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';

const MyPosts = (props) => {

  let postsElemets = props.posts.map(p => <Post message={p.message} numberLike={p.numberLike} />);

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
        {postsElemets}
      </div>
    </div>
  );
}

export default MyPosts;
