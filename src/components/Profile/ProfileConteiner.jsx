import React from 'react';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redax/profileReducer.js';
import Profile from './Profile.jsx';
import * as axios from 'axios';
import s from './Profile.module.css';
import { withRouter } from 'react-router-dom';

class ProfileConteiner extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    axios.get(`https://social-network.samuraijs.com/api/1.0/Profile/` + userId)
      .then(response => {
        this.props.setUserProfile(response.data);
      });
  }
  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile
});

let WithUrlDataConteinerComponent = withRouter(ProfileConteiner);

export default connect(mapStateToProps, { setUserProfile })(WithUrlDataConteinerComponent);