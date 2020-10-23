import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
const MyPosts = () => {

  let posts = [
    { id: 1, message: "Hi, how are you?", numberLike: 15 },
    { id: 2, message: 'It\' s my fist post', numberLike: 20 },
    { id: 3, message: 'Nothing is clear, but very interesting! )', numberLike: 34 },
    { id: 4, message: 'YO', numberLike: 5 },
    { id: 5, message: 'My fist post', numberLike: 2 }
  ]

  let postsElemets = posts.map(p => <Post message={p.message} numberLike={p.numberLike} />);

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
