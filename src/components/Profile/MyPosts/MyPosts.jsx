import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
import { reduxForm, Field } from 'redux-form';

const MyPosts = (props) => {

  let postsElemets = props.posts.map(p => <Post message={p.message} numberLike={p.numberLike} key={p.id} />);

  let newPostElemet = React.createRef();

  let addNewPost = (values) => {
    props.addPost(values.newPostBody)
  }

  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <AddPostFormRedux onSubmit={addNewPost} />
        </div>
      </div>
      <div className={s.posts}>
        {postsElemets}
      </div>
    </div>
  );
}

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component="textarea" name="newPostBody" placeholder="New Post" />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({ form: "myPostsAddPostForm" })(AddPostForm)

export default MyPosts;
