import React from 'react';
import { addPostActionCreator, onPostChangeActionCreator } from '../../../redax/profileReducer';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';

const MyPosts = (props) => {

  let postsElemets = props.posts.map(p => <Post message={p.message} numberLike={p.numberLike} />);

  let newPostElemet = React.createRef();

  let addPost = () => {
    props.dispatch(addPostActionCreator());
  }

  let onPostChange = () => {
    let text = newPostElemet.current.value;
    props.dispatch(onPostChangeActionCreator(text));
  }

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElemet} value={props.newPostText}></textarea>
        </div>
        <div>
          <button onClick={addPost} >Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsElemets}
      </div>
    </div>
  );
}

export default MyPosts;
