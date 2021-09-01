import { actions } from '../../../redax/profileReducer';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redax/reduxStore';

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts
  }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator
})(MyPosts);

export default MyPostsContainer;
