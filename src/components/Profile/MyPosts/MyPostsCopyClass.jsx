import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators.js';
import { Textarea } from '../../common/FormsControls/FormControls';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';

class MyPostsClassCopy extends React.PureComponent {
  
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({a: 12});
  //   }, 3000)
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps != this.props || nextState != this.state;
  // }

  render() {
    console.log("RENDER YO")

    let postsElemets = this.props.posts.map(p => <Post message={p.message} numberLike={p.numberLike} key={p.id} />);

    let newPostElemet = React.createRef();

    let addNewPost = (values) => {
      this.props.addPost(values.newPostBody)
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
    )
  }
}
const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name="newPostBody" placeholder="New Post"
          validate={[required, maxLength10]} />
      </div>
      <div>
        <button>Add Post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({ form: "myPostsAddPostForm" })(AddPostForm)

export default MyPostsClassCopy;
