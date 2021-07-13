import React from 'react';
import { addPostActionCreator } from '../../../redax/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import MyPostsClassCopy from './MyPostsCopyClass';

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostBody) => {
      dispatch (addPostActionCreator(newPostBody))
    }
  }

}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
