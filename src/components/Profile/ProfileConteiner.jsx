import React from 'react';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redax/profileReducer.js';
import Profile from './Profile.jsx';
import s from './Profile.module.css';
import { withRouter } from 'react-router-dom';

class ProfileConteiner extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 2;
    }
    this.props.getUserProfile(userId);
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

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataConteinerComponent);