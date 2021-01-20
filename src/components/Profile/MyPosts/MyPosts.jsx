import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';

const MyPosts = (props) => {

  let postsElemets = props.posts.map(p => <Post message={p.message} numberLike={p.numberLike} key={p.id} />);

  let newPostElemet = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElemet.current.value;
    props.onPostChange(text);
  }

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElemet} value={props.newPostText}></textarea>
        </div>
        <div>
          <button onClick={onAddPost} >Add post</button>
        </div>
      </div>
      <div className={s.posts}>
        {postsElemets}
      </div>
    </div>
  );
}

export default MyPosts;
