import React, { FC } from 'react'
import s from './MyPosts.module.css'
import Post from './Post/Post'
import AddPostForm from './AddPostForm/AddPostForm'
import { PostsType } from '../../../types/types';

const MyPosts: FC<MapPropsType & DispatchPropsType> = React.memo(props => {

  const postsElemets = props.posts.map(p => <Post message={p.message} numberLike={p.numberLike} key={p.id} />);

  const addNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostBody)
  }
  return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <AddPostForm onSubmit={addNewPost} />
        </div>
      </div>
      <div className={s.posts}>
        {postsElemets}
      </div>
    </div>
  );
});

export default MyPosts;

export type MapPropsType = {
  posts: Array<PostsType>
}

export type DispatchPropsType = {
  addPost: (messageText: string) => void
}

export type AddPostFormValuesType = {
  newPostBody: string
}